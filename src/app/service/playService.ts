import { RequestOptions } from '@angular/http';
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
    /**
     * 发送消息
     * @param params 
     */
    sendRoomMsg(params) {
        let url = "/v1/api/play_room_messages/" + params.roomId;
        return this.Post(url, params);
    }
    /**
     * 获取开奖趋势
     * @param playTypeId 
     * @param limit 
     */
    getTrendData(playTypeId: string, limit: Number = 500) {
        let url = "/v1/api/play_trends/" + playTypeId + "/" + limit;
        return this.Get(url);
    }
    /**
     * 进入房间需要调用的接口
     * @param play_room_id 
     */
    createPlayer(play_room_id) {
        if (play_room_id == undefined || play_room_id == null) {
            return;
        }
        let url = `/v1/api/play_rooms/${play_room_id}/player`;
        return this.Put(url, {});
    }
    /**
     * 离开房间需要调用的接口
     * @param play_room_id 
     */
    deletePlayer(play_room_id) {
        if (play_room_id == undefined || play_room_id == null) {
            return;
        }
        let url = `/v1/api/play_rooms/${play_room_id}/player`;
        return this.Delete(url);
    }

    /**
     * 房间内上分
     * @param play_room_id 
     * @param points 
     */
    incrementPoints(play_room_id, points) {
        if (play_room_id == undefined || play_room_id == null) {
            return;
        }
        let url = `/v1/api/play_rooms/${play_room_id}/points`;
        let params = {
            points: points
        }
        return this.Post(url, params);
    }

    /**
     * 下分
     * @param play_room_id 
     * @param points 
     */
    decrementPoints(play_room_id, points) {
        if (play_room_id == undefined || play_room_id == null) {
            return;
        }
        let url = `/v1/api/play_rooms/${play_room_id}/points`;
        let options = new RequestOptions({
            body: {
                points: points
            }
        })
        return this.Delete(url, options);
    }
}