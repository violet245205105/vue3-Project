import jwt
import time
import json
from flask import request
from database import get_user_list, add_user


def create_token(item):
    data = {
        'exp': time.time()+1000,
        'iat': time.time(),
        'iss': 'violet',
        'data': {
            'userId': item['id'],
            'timestamp': time.time(),
            'token_key': 'banner',
        }
    }
    return jwt.encode(data, 'xyy', algorithm='HS256')


def login():
    data = request.get_data()
    json_data = json.loads(data)
    for item in get_user_list():
        if item['user'] == json_data['user'] and item['password'] == json_data['password']:
            return {
                'code': 2000,
                'message': "登录成功",
                'token': create_token(item)
            }
    return {
        'code': 2001,
        'message': "账号或密码错误",
    }


def register():
    data = request.get_data()
    json_data = json.loads(data)
    for item in get_user_list():
        if item['user'] == json_data['user']:
            return {
                'code': 2001,
                'message': "用户已存在",
            }
    id = int(time.time()) % 100000000
    json_data['id'] = id
    add_user(json_data)
    return {
        'code': 2000,
        'message': "注册成功",
    }
