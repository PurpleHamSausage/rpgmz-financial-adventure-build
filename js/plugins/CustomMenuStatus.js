/*:
 * @target MZ
 * @plugindesc 自訂主選單：隱藏右側指令欄與角色職業/HP/MP
 */

(() => {
    // 隱藏右邊：道具、技能、裝備、狀態、隊形...那個指令視窗
    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.hide();
        this._commandWindow.deactivate();
    };

    // 讓角色狀態區塊往左補滿
    Scene_Menu.prototype.statusWindowRect = function() {
        const ww = Graphics.boxWidth;
        const wh = this.mainAreaHeight();
        const wx = 0;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    // 自訂角色狀態內容：不顯示職業、HP、MP
    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        const actor = this.actor(index);
        const rect = this.itemRectWithPadding(index);
        const x = rect.x + 180;
        const y = rect.y + rect.height / 2 - this.lineHeight();

        this.drawActorName(actor, x, y, 220);
        // this.drawActorLevel(actor, x, y + this.lineHeight());
    };
})();