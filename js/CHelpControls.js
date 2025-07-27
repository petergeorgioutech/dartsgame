function CHelpControls(){
    var _oTextHelp;
    var _oContainer;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        _oContainer.x = CANVAS_WIDTH/2;
        _oContainer.y = CANVAS_HEIGHT/2-350;
        s_oStage.addChild(_oContainer);
        
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("help_box");
        var oBg = createBitmap(oSpriteBg);
        _oContainer.addChild(oBg);
        
        _oTextHelp = new CTLText(_oContainer, 
                    0, 0, oSpriteBg.width, oSpriteBg.height, 
                    60, "center", "#fff", FONT, 1,
                    20, 20,
                    TEXT_HELP_CONTROLS_1,
                    true, true, true,
                    false );

        
        
        _oContainer.regX = oSpriteBg.width/2;
        _oContainer.regY = oSpriteBg.height/2;
        
        _oContainer.alpha = 0;
        createjs.Tween.get(_oContainer).to({alpha:1}, 500,createjs.Ease.cubicOut);
        
    };
    
    this.refreshButtonPos = function(){
        if(s_bLandscape){
            _oContainer.y = s_iOffsetY + _oContainer.regY + 100
        }else{
            _oContainer.y = CANVAS_HEIGHT/2-350;
        }
    };
    
    this.hide = function(){
        createjs.Tween.get(_oContainer).to({alpha:0}, 400,createjs.Ease.cubicOut);
    };
    
    this.nextHelp = function(){
        _oTextHelp.refreshText(TEXT_HELP_CONTROLS_2);
    };
    
    this._init();
}