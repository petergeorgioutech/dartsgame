function CPromotionGame(iResult) {
    var _iResult = iResult; // MODE_PROMOTION_WIN or MODE_PROMOTION_LOSE
    var _bDartThrown = false;
    var _bAnimationComplete = false;
    var _bGameStarted = false;

    var _oContainerGame;
    var _oContainerDartBoard;
    var _oContainerDart;
    var _oContainerBg;
    var _oBoardDart;
    var _oCurDart;
    var _oDartContainer; // New container for the visible dart
    var _oVisibleDart; // Reference to the visible dart sprite
    var _oResultModal;
    var _oInstructionsModal;
    var _oPlayButton;
    var _oPlayButtonContainer;
    var _oPlayButtonListener;

    var _pStartDartPos;
    var _pEndDartPos;
    var _iHeightDartBoard;
    var _iStartXDartBoard;
    var _oOriginalBounds;

    this._init = function () {
        console.log("Initializing promotion game...");

        // Disable soundtrack for promotion
        if (s_oSoundTrack) {
            s_oSoundTrack.stop();
        }

        _oContainerGame = new createjs.Container();
        _oContainerGame.x = CANVAS_WIDTH / 2;
        _oContainerGame.regX = CANVAS_WIDTH / 2;
        s_oStage.addChild(_oContainerGame);

        this._initDartBoard();
        this._createDart();

        // Position dartboard at normal scale for instructions modal
        this._positionDartBoardNormal();

        // Show instructions modal first
        this._showInstructions();

        console.log("Promotion game initialization complete");
    };

    this.unload = function () {
        if (_oPlayButtonContainer) {
            _oPlayButton.off('mousedown', _oPlayButtonListener);
            s_oStage.removeChild(_oPlayButtonContainer);
        }

        if (_oResultModal) {
            _oResultModal.unload();
        }

        if (_oInstructionsModal) {
            _oInstructionsModal.unload();
        }

        s_oPromotionGame = null;
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
    };

    this.refreshButtonPos = function () {
        if (_bGameStarted) {
            // Only apply scaling when game has started
            this.refreshGridScale();
        }
    };

    this.refreshGridScale = function () {
        var iGUIHeight = 100;
        var iMaxGridSizeHeight = (CANVAS_HEIGHT - (s_iOffsetY * 2)) - iGUIHeight;

        CUR_GRID_SCALE = iMaxGridSizeHeight / _iHeightDartBoard;
        CUR_GRID_SCALE = parseFloat(CUR_GRID_SCALE.toFixed(2));
        _oContainerDartBoard.scaleX = _oContainerDartBoard.scaleY = CUR_GRID_SCALE;

        _oContainerBg.regX = (CANVAS_WIDTH / 2);
        _oContainerBg.x = (CANVAS_WIDTH / 2);
        _oContainerBg.regY = CANVAS_HEIGHT / 2;
        _oContainerBg.y = CANVAS_HEIGHT / 2;

        _oContainerBg.scaleX = _oContainerBg.scaleY = 1 / CUR_GRID_SCALE;
        _oContainerBg.scaleX = _oContainerBg.scaleY *= 1.5;
    };

    this._initDartBoard = function () {
        _oContainerDartBoard = new createjs.Container();
        _oContainerGame.addChild(_oContainerDartBoard);

        this._initBg();

        var oSpriteBoard = s_oSpriteLibrary.getSprite("dartboard");
        _oBoardDart = new CDartBoard(_oContainerBg.getBounds().width / 2, oSpriteBoard.height / 2, oSpriteBoard, _oContainerDartBoard);

        _oContainerDart = new createjs.Container();
        _oContainerDartBoard.addChild(_oContainerDart);

        _pStartDartPos = { x: _oContainerBg.getBounds().width / 2 - 700, y: oSpriteBoard.height - 200 + DART_HEIGHT };
        _pEndDartPos = { x: _oContainerBg.getBounds().width / 2 + 700, y: oSpriteBoard.height - 200 + DART_HEIGHT };

        _iHeightDartBoard = _pStartDartPos.y;
        _oContainerDartBoard.regX = _oContainerDartBoard.getBounds().width / 2;
        _oContainerDartBoard.x = _iStartXDartBoard = CANVAS_WIDTH / 2;

        // Store original bounds for later scaling
        _oOriginalBounds = _oContainerDartBoard.getBounds();
    };

    this._initBg = function () {
        _oContainerBg = new createjs.Container();
        _oContainerDartBoard.addChild(_oContainerBg);

        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        _oContainerBg.addChild(oBg);
    };

    this._createDart = function () {
        var oDart = new CDart(_pStartDartPos.x, _pStartDartPos.y, 0, _pEndDartPos, _oContainerDart);
        _oCurDart = oDart;

        // Stop the dart's back-and-forth animation immediately
        _oCurDart.stopTween();

        // Hide the actual throwing dart initially
        _oCurDart.alpha = 0;

        // Create a separate container for the visible dart (positioned relative to game container)
        _oDartContainer = new createjs.Container();
        _oContainerGame.addChild(_oDartContainer);

        // Create a copy of the dart sprite for the visible dart
        var oDartSprite = s_oSpriteLibrary.getSprite("dart_0_0"); // Use first dart sprite
        var oVisibleDart = createBitmap(oDartSprite);
        oVisibleDart.x = 0;
        oVisibleDart.y = 0;
        oVisibleDart.regX = oDartSprite.width / 2;
        oVisibleDart.regY = oDartSprite.height / 2;
        oVisibleDart.scaleX = 0.2; // Make it smaller
        oVisibleDart.scaleY = 0.2; // Make it smaller
        _oDartContainer.addChild(oVisibleDart);

        // Store reference to visible dart
        _oVisibleDart = oVisibleDart;

        // Make dart fully opaque
        _oVisibleDart.alpha = 1;
    };

    this._showDartAndThrow = function () {
        // Fade out the visible dart
        createjs.Tween.get(_oVisibleDart).to({ alpha: 0 }, 200, createjs.Ease.cubicOut);

        // Start the throwing motion immediately
        s_oPromotionGame._startThrowingMotion();
    };

    this._startThrowingMotion = function () {
        // Hide the visible dart
        _oVisibleDart.alpha = 0;

        // Position the actual throwing dart at the same location as the visible dart
        _oCurDart.x = _oDartContainer.x;
        _oCurDart.y = _oDartContainer.y;

        // Make the throwing dart visible
        _oCurDart.alpha = 1;

        // Store original position
        var originalX = _oCurDart.x;
        var originalY = _oCurDart.y;

        // Move dart back (wind-up motion)
        createjs.Tween.get(_oCurDart).to({
            x: originalX - 200,
            y: originalY - 50
        }, 400, createjs.Ease.cubicOut).call(function () {
            // After wind-up, throw the dart forward
            s_oPromotionGame._throwDart();
        });
    };

    this._showInstructions = function () {
        console.log("Showing instructions modal...");
        _oInstructionsModal = new CPromotionInstructionsModal();
        console.log("Instructions modal created:", _oInstructionsModal ? "yes" : "no");
    };

    this._startGame = function () {
        _bGameStarted = true;

        // Position dartboard for gameplay
        _oContainerDartBoard.y = s_iOffsetY + 20;

        // Apply proper scaling for the game
        this.refreshButtonPos();

        // Create play button overlay
        this._createPlayButton();

        // Position dart next to the play button
        this._positionDartNextToButton();
    };

    this._positionDartBoardNormal = function () {
        // Position dartboard at normal scale without applying game scaling
        _oContainerDartBoard.y = s_iOffsetY + 20;

        // Set normal scale (no zoom)
        _oContainerDartBoard.scaleX = _oContainerDartBoard.scaleY = 1;

        // Position background normally
        _oContainerBg.regX = (CANVAS_WIDTH / 2);
        _oContainerBg.x = (CANVAS_WIDTH / 2);
        _oContainerBg.regY = CANVAS_HEIGHT / 2;
        _oContainerBg.y = CANVAS_HEIGHT / 2;

        // Set background to normal scale
        _oContainerBg.scaleX = _oContainerBg.scaleY = 1;
    };

    this._createPlayButton = function () {
        // Create play button container
        _oPlayButtonContainer = new createjs.Container();
        _oContainerGame.addChild(_oPlayButtonContainer);

        // Create play button using existing button sprite
        var oPlayButtonSprite = s_oSpriteLibrary.getSprite("but_play");
        _oPlayButton = createBitmap(oPlayButtonSprite);
        _oPlayButton.x = 0;
        _oPlayButton.y = 0;
        _oPlayButton.regX = oPlayButtonSprite.width / 2;
        _oPlayButton.regY = oPlayButtonSprite.height / 2;
        _oPlayButtonContainer.addChild(_oPlayButton);

        // Make button more visible for debugging
        _oPlayButton.alpha = 1;
        console.log("Button sprite loaded:", oPlayButtonSprite ? "yes" : "no");
        console.log("Button dimensions:", oPlayButtonSprite ? oPlayButtonSprite.width + "x" + oPlayButtonSprite.height : "unknown");

        // Position the button container below the dartboard
        this._positionPlayButton();

        // Add click listener
        _oPlayButtonListener = _oPlayButton.on('mousedown', this.onPlayButtonClick);

        // Add hover effects
        _oPlayButton.on('mouseover', this.onPlayButtonHover);
        _oPlayButton.on('mouseout', this.onPlayButtonOut);

        // Set cursor to pointer
        _oPlayButton.cursor = "pointer";

        // Debug: Make button more visible for testing
        console.log("Play button created and positioned");
    };

    this._positionPlayButton = function () {
        // Position the play button below the dartboard using a simpler approach
        var iDartBoardCenterY = _oContainerDartBoard.y;
        var iDartBoardHeight = 800; // Approximate dartboard height in pixels

        _oPlayButtonContainer.x = CANVAS_WIDTH / 2;
        _oPlayButtonContainer.y = iDartBoardCenterY + (iDartBoardHeight * _oContainerDartBoard.scaleY) + 500; // 700px below dartboard bottom

        // Debug: Log the positioning
        console.log("Dartboard Y:", _oContainerDartBoard.y);
        console.log("Dartboard scale:", _oContainerDartBoard.scaleY);
        console.log("Button Y:", _oPlayButtonContainer.y);

        // Fallback: If button is off-screen, position it in a visible area
        if (_oPlayButtonContainer.y > CANVAS_HEIGHT - 100) {
            _oPlayButtonContainer.y = CANVAS_HEIGHT - 150;
            console.log("Button repositioned to fallback position:", _oPlayButtonContainer.y);
        }
    };

    this._positionDartNextToButton = function () {
        // Position dart container to the left of the play button
        _oDartContainer.x = _oPlayButtonContainer.x - 150; // 150px to the left of play button
        _oDartContainer.y = _oPlayButtonContainer.y; // Same Y position as play button

        console.log("Dart container positioned at:", _oDartContainer.x, _oDartContainer.y);
        console.log("Play button at:", _oPlayButtonContainer.x, _oPlayButtonContainer.y);
    };

    this.onPlayButtonHover = function (e) {
        createjs.Tween.get(_oPlayButton).to({ scaleX: 1.2, scaleY: 1.2 }, 200, createjs.Ease.cubicOut);
    };

    this.onPlayButtonOut = function (e) {
        createjs.Tween.get(_oPlayButton).to({ scaleX: 1, scaleY: 1 }, 200, createjs.Ease.cubicOut);
    };

    this.onPlayButtonClick = function (e) {
        if (_bDartThrown) {
            return;
        }

        _bDartThrown = true;

        // Remove click listener
        _oPlayButton.off('mousedown', _oPlayButtonListener);
        _oPlayButton.off('mouseover', s_oPromotionGame.onPlayButtonHover);
        _oPlayButton.off('mouseout', s_oPromotionGame.onPlayButtonOut);

        // Hide the play button with fade out animation
        createjs.Tween.get(_oPlayButtonContainer).to({ alpha: 0 }, 300, createjs.Ease.cubicOut).call(function () {
            s_oStage.removeChild(_oPlayButtonContainer);

            // After play button is hidden, fade in the dart and then throw it
            s_oPromotionGame._showDartAndThrow();
        });
    };

    this._throwDart = function () {
        var iDartX = _oCurDart.getX();
        var iDartY = _oCurDart.getY();

        // For win scenario, use exact bullseye coordinates
        if (_iResult === MODE_PROMOTION_WIN) {
            // Use exact bullseye coordinates from AI_INFO_HIT
            var iOffsetX = 960 - iDartX; // Target X coordinate for bullseye
            var fForce = 920; // Exact force for bullseye

        } else {
            // For lose scenario, target the outer/middle rings of the dartboard
            var iAngle = Math.random() * 360;

            // Target specific ring areas - outer and middle rings
            // Use a random distance that targets the outer areas of the dartboard
            var iDistance;
            if (Math.random() < 0.5) {
                // Target outer ring (far edge of dartboard)
                iDistance = 300 + Math.random() * 100; // 300-400 pixels from center
            } else {
                // Target middle ring (between outer and inner areas)
                iDistance = 200 + Math.random() * 80; // 200-280 pixels from center
            }

            // Calculate target position relative to bullseye center (960, 940)
            var iTargetX = 960 + Math.cos(iAngle * Math.PI / 180) * iDistance;
            var iTargetY = 940 + Math.sin(iAngle * Math.PI / 180) * iDistance;

            // Calculate offset to hit this target
            var iOffsetX = iTargetX - iDartX;
            var fForce = 920 + (Math.random() - 0.5) * 100; // Vary force around bullseye force
        }

        _oCurDart.startAnim(iOffsetX, fForce, iOffsetX / 700);

        this._prepareLaunchDart();
    };

    this._prepareLaunchDart = function () {
        var iNewX = CANVAS_WIDTH / 2 + (CANVAS_WIDTH / 2 - _oCurDart.getNewX());
        var iNewY = -(_oCurDart.getNewY() - _oContainerDartBoard.y);

        if (!s_bLandscape) {
            iNewY += CANVAS_HEIGHT / 3;
        } else {
            iNewY += CANVAS_HEIGHT / 5;
        }

        createjs.Tween.get(_oContainerDartBoard).to({ y: iNewY + 200 }, 500, createjs.Ease.cubicOut).to({ y: iNewY }, 500, createjs.Ease.sineIn);
        createjs.Tween.get(_oContainerDartBoard).to({ x: iNewX }, PROMOTION_ANIMATION_DURATION, createjs.Ease.cubicOut);
        createjs.Tween.get(_oContainerDartBoard).to({ scaleX: 1.5, scaleY: 1.5 }, PROMOTION_ANIMATION_DURATION, createjs.Ease.cubicOut);

        playSound("launch", 1, false);

        // Wait for animation to complete then show result
        setTimeout(function () {
            s_oPromotionGame._showResult();
        }, PROMOTION_ANIMATION_DURATION + PROMOTION_MODAL_DELAY);
    };

    this._showResult = function () {
        _bAnimationComplete = true;

        if (_iResult === MODE_PROMOTION_WIN) {
            playSound("win", 1, false);
            _oResultModal = new CPromotionWinModal();
        } else {
            playSound("miss", 1, false);
            _oResultModal = new CPromotionLoseModal();
        }
    };

    this.update = function () {
        // No continuous updates needed for promotion
    };

    this._endThrow = function () {
        // This method is called by CDart when the dart animation completes
        // We don't need to do anything here since we handle the result in _prepareLaunchDart
    };

    s_oPromotionGame = this;

    // Set this promotion game as the global game object so CDart can call _endThrow
    s_oGame = this;

    this._init();
}

var s_oPromotionGame = null; 