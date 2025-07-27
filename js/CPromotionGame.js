function CPromotionGame(iResult) {
    var _iResult = iResult; // MODE_PROMOTION_WIN or MODE_PROMOTION_LOSE
    var _bDartThrown = false;
    var _bAnimationComplete = false;

    var _oContainerGame;
    var _oContainerDartBoard;
    var _oContainerDart;
    var _oContainerBg;
    var _oBoardDart;
    var _oCurDart;
    var _oHitArea;
    var _oListenerDown;
    var _oResultModal;

    var _pStartDartPos;
    var _pEndDartPos;
    var _iHeightDartBoard;
    var _iStartXDartBoard;

    this._init = function () {
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

        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oContainerGame.addChild(_oHitArea);

        this._resetHitArea();
        this.refreshButtonPos();
    };

    this.unload = function () {
        _oHitArea.off('mousedown', _oListenerDown);

        if (_oResultModal) {
            _oResultModal.unload();
        }

        s_oPromotionGame = null;
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
    };

    this.refreshButtonPos = function () {
        _oContainerDartBoard.y = s_iOffsetY + 20;
        this.refreshGridScale();
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
    };

    this._resetHitArea = function () {
        _oListenerDown = _oHitArea.on('mousedown', this.onMouseDown);
    };

    this.onMouseDown = function (e) {
        if (_bDartThrown) {
            return;
        }

        _bDartThrown = true;
        _oHitArea.off('mousedown', _oListenerDown);

        // Stop the dart's back-and-forth animation
        _oCurDart.stopTween();

        s_oPromotionGame._throwDart();
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