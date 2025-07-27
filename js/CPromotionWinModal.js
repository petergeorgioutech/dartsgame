function CPromotionWinModal() {
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

        // Win text
        _oText = new createjs.Text("BULLSEYE!\nYOU WIN!", "bold 60px " + FONT, "#FFD700");
        _oText.textAlign = "center";
        _oText.textBaseline = "middle";
        _oText.x = CANVAS_WIDTH / 2;
        _oText.y = CANVAS_HEIGHT / 2 - 100;
        _oContainer.addChild(_oText);

        // Continue button
        var oSprite = s_oSpriteLibrary.getSprite('but_next');
        _oButContinue = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 100, oSprite, _oContainer);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onContinue, this);

        // Fade in animation
        _oContainer.alpha = 0;
        createjs.Tween.get(_oContainer).to({ alpha: 1 }, 500, createjs.Ease.cubicOut);

        this.refreshButtonPos();
    };

    this.unload = function () {
        _oButContinue.unload();
        _oButContinue = null;

        s_oStage.removeChild(_oContainer);
        _oContainer = null;
    };

    this.refreshButtonPos = function () {
        _oButContinue.setPosition(_oButContinue.getX() - s_iOffsetX, _oButContinue.getY() + s_iOffsetY);
    };

    this._onContinue = function () {
        // Fade out and reveal win page
        createjs.Tween.get(_oContainer).to({ alpha: 0 }, 500, createjs.Ease.cubicIn).call(function () {
            s_oPromotionGame.unload();

            // Dispatch event to parent page
            document.dispatchEvent(new CustomEvent("promotion_win_complete"));
        });
    };

    this._init();
} 