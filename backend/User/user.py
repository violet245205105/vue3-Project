import jwt
from flask import request, jsonify
import database
import math
import json


def get_avatar():
    return {
        'code': 200,
        'data':  [
            "https://pic3.zhimg.com/v2-daf4d5cb213fc1177a911d1c7de6c9c2_r.jpg",
            "https://pic2.zhimg.com/v2-fb06c80f8cdd2f047758b74804590f69_r.jpg",
            "https://pic3.zhimg.com/v2-a80165824348491d55abcd398c13ff0a_b.jpg",
            "https://pic2.zhimg.com/v2-2106b74448f0a5e86cba182c93109c59_b.jpg",
            "https://pic3.zhimg.com/80/v2-f677ee146234afc6716f24ab5663df76_1440w.webp",
            "https://picx.zhimg.com/80/v2-7b97275095a9f8222d23b5b5286a3aff_1440w.webp",
            "https://pica.zhimg.com/v2-d759d9c0d80d1df11b3d65cd369a894c_r.jpg",
            "https://picx.zhimg.com/80/v2-693712f8f1bfb47e0c7db00b44136c47_1440w.webp",
            "https://pic2.zhimg.com/80/v2-e2e048841c5cbfe27c423c1a1f613be5_1440w.webp",
            "https://picx.zhimg.com/80/v2-b14eca98c998ae641a89a39e5aaf3e93_1440w.webp",
            "https://pic4.zhimg.com/80/v2-4d34bf8f0711d2ccc4b853e329658467_1440w.webp",
            "https://picx.zhimg.com/v2-4ebf24a86856805c3107845466e47edf_r.jpg",
        ]
    }


def get_user():
    token = request.headers['Cookie'].split('=')
    user = jwt.decode(token[1], "xyy", algorithms=['HS256'])
    data = database.get_user(user['data']['userId'])
    return {
        'code': 200,
        'data': data[0]
    }


def get_user_list():
    search = request.args.get('search')
    page = request.args.get('startPage', type=int)
    per_page = request.args.get('totalPage', type=int)
    user_list = database.get_user_list(
        search=search, page=page, per_page=per_page)
    total_arr = database.get_user_list()
    return {
        'code': 200,
        'data': user_list,
        'total': math.ceil(len(total_arr)/per_page),
        'sum': len(total_arr)
    }


def update_user():
    data = request.get_data()
    json_data = json.loads(data)
    try:
        database.update_user(json_data)
        return {
            'code': 2000,
            'message': '更新成功'
        }
    except:
        return {
            'code': 2001,
            'message': '更新失败'
        }


def delete_user():
    data = request.get_data()
    user_ids = json.loads(data)
    try:
        database.delete_users(user_ids['id'])
        return {
            'code': 2000,
            'message': '删除成功'
        }
    except:
        return {
            'code': 2001,
            'message': '删除失败'
        }
