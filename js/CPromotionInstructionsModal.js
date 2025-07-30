function CPromotionInstructionsModal() {
    var _oContainer;
    var _oBg;
    var _oText;
    var _oButContinue;
    var _oListenerContinue;

    this._init = function () {
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        // Semi-transparent background
        _oBg = new createjs.Shape();
        _oBg.graphics.beginFill("rgba(0,0,0,0.8)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oContainer.addChild(_oBg);

        // Lemon yellow modal background
        var _oModalBg = new createjs.Shape();
        _oModalBg.graphics.beginFill("#f6d808").drawRect(CANVAS_WIDTH / 2 - 400, CANVAS_HEIGHT / 2 - 300, 800, 600);
        _oContainer.addChild(_oModalBg);

        // Instructions text
        _oText = new createjs.Text(PROMOTION_INSTRUCTIONS_TITLE, "bold 40px " + FONT, "#333333");
        _oText.textAlign = "center";
        _oText.textBaseline = "middle";
        _oText.x = CANVAS_WIDTH / 2;
        _oText.y = CANVAS_HEIGHT / 2 - 150;
        _oText.lineHeight = 50;
        _oContainer.addChild(_oText);

        // Continue button - create a racing green button with text
        _oButContinue = new createjs.Container();
        _oButContinue.x = CANVAS_WIDTH / 2;
        _oButContinue.y = CANVAS_HEIGHT / 2 + 200; // Slightly higher and centered
        _oContainer.addChild(_oButContinue);

        // Racing green button background
        var _oButtonBg = new createjs.Shape();
        _oButtonBg.graphics.beginFill("#145733").drawRoundRect(-100, -25, 200, 50, 10);
        _oButContinue.addChild(_oButtonBg);

        // Button text
        var _oButtonText = new createjs.Text(PROMOTION_INSTRUCTIONS_BUTTON_TEXT, "bold 24px " + FONT, "#f1eee8");
        _oButtonText.textAlign = "center";
        _oButtonText.textBaseline = "middle";
        _oButtonText.x = 0;
        _oButtonText.y = 0;
        _oButContinue.addChild(_oButtonText);

        // Add click listener
        _oButContinue.cursor = "pointer";
        _oButContinue.on("mousedown", this._onContinue);

        // Fade in animation
        _oContainer.alpha = 0;
        createjs.Tween.get(_oContainer).to({ alpha: 1 }, 500, createjs.Ease.cubicOut);

        this.refreshButtonPos();
    };

    this.unload = function () {
        if (_oButContinue) {
            _oButContinue.off("mousedown", this._onContinue);
            _oButContinue = null;
        }

        s_oStage.removeChild(_oContainer);
        _oContainer = null;
    };

    this.refreshButtonPos = function () {
        // Ensure proper centering - use absolute center
        _oButContinue.x = CANVAS_WIDTH / 2;
        _oButContinue.y = CANVAS_HEIGHT / 2 + 200;

        // Debug centering
        console.log("Button X:", _oButContinue.x, "Canvas center:", CANVAS_WIDTH / 2);
    };

    this._onContinue = function () {
        // Fade out and start the game
        createjs.Tween.get(_oContainer).to({ alpha: 0 }, 500, createjs.Ease.cubicIn).call(function () {
            s_oPromotionGame._startGame();
        });
    };

    this._init();
} 