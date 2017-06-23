import { ServiceBase } from './ServiceBase';
import { Injectable } from '@angular/core';


export class PlayService extends ServiceBase {
    private playTypesList = [];
    private roomList = [];

    getPlayTypesList() {
        return this.playTypesList;
    }

    setPlayTypesList(playTypesList) {
        this.playTypesList = playTypesList;
    }

    getRoomList() {
        return this.roomList;
    }

    setRoomList(roomList) {
        this.roomList = roomList;
    }
    /**
     * 取不同玩法当天的开奖记录
     * @param playTypeId 玩法的类型id
     * @param limit 返回数据的条数
     */
    getPlays(playTypeId: string, limit?: string) {
        let url = "/v1/api/plays/" + playTypeId
        if (limit != undefined) {
            url += "/" + limit;
        }

        return this.Get(url);
    }
    /**
     * 获取玩法列表
     */
    getPlayTypes() {
        let url = "/v1/api/play_types";
        return this.Get(url);
    }
    /**
     * 获取房间列表
     * @param typeId 玩法的类型编号
     */
    getPlayRooms(typeId?: string) {
        let url = "/v1/api/play_rooms";
        if (typeId != undefined) {
            url += "?type_id=" + typeId;
        }
        return this.Get(url);
    }
    /**
     * 获取开奖历史
     * @param playTypeId 
     * @param date 
     */
    getPlaysHistory(playTypeId: string, date: string) {
        let url = "/v1/api/plays_history/" + playTypeId + "/" + date;
        return this.Get(url);
    }
    /**
     * 获取聊天室消息
     * @param roomId 
     */
    getPlayRoomMsg(roomId, limit: Number = 50, lastTime?: Number) {
        let url = "/v2/api/play_room_messages/" + roomId;
        // url += "?limit=" + limit;
        if (lastTime) {
            url += "?last_time=" + lastTime;
        }
        return this.Get(url);
    }

    sendRoomMsg(params) {
        let url = "/v1/api/play_room_messages/" + params.roomId;
        return this.Post(url, params);
    }
}