function CAlertText(){
    var _oText;
    var _oContainer;
    
    this._init = function(){
        
        _oContainer = new createjs.Container();
        _oContainer.x =  CANVAS_WIDTH/2;
        _oContainer.y = CANVAS_HEIGHT/2+350;
        _oContainer.visible = false;
        s_oStage.addChild(_oContainer);
        
        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("rgba(0,0,0,0.7)").drawRoundRect (-200,0,400,100,10);
        _oContainer.addChild(oFade);

        
        _oText = new CTLText(_oContainer, 
                    -190, 10, 380, 80, 
                    40, "center", "#fff", FONT, 1,
                    0, 0,
                    " ",
                    true, true, true,
                    false );
                    
  
    };
    
    this.hide = function(){
        _oContainer.visible = false;
    };
    
    this.show = function(szText){
        if(createjs.Tween.hasActiveTweens(_oContainer)){
            return;
        }
        
        _oText.refreshText(szText);
        
        _oContainer.visible = true;
        
        _oContainer.scaleX = _oContainer.scaleY = 0.1;
        new createjs.Tween.get(_oContainer).to({scaleX:1,scaleY:1},600, createjs.Ease.cubicOut);
                
    };
    
    this._init();
}