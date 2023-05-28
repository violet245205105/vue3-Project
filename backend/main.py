from flask import Flask, request, jsonify
import Auth.auth
import User.user
import Video.video
import Music.music
import database
import jwt
import time
whiteList = ["/login", "/register", "/getlist"]

app = Flask(__name__)


@app.before_request
def process_request(*args, **kwargs):
    if request.path in whiteList:
        return None
    else:
        if 'Cookie' not in request.headers:
            return {
                'code': 403,
                'message': '没有提供Cookie'
            }

        cookie = request.headers['Cookie']
        token = None

        if cookie:
            cookie_parts = cookie.split('=')
            if len(cookie_parts) > 1:
                token = cookie_parts[1]

        if not token:
            return {
                'code': 403,
                'message': 'Token不存在'
            }

        try:
            user = jwt.decode(token, 'xyy', algorithms=['HS256'])
            if user['exp'] < time.time():
                return {
                    'code': 403,
                    'message': 'Token已过期'
                }
        except jwt.ExpiredSignatureError:
            return {
                'code': 403,
                'message': 'Token已过期'
            }
        except jwt.InvalidTokenError:
            return {
                'code': 403,
                'message': '无效的Token'
            }

        return None
# 路由处理函数


@app.route('/login', methods=['POST'])
def login_route():
    return Auth.auth.login()


@app.route('/register', methods=['POST'])
def register_route():
    return Auth.auth.register()


@app.route('/getUserData', methods=['GET'])
def get_user_data():
    return User.user.get_user_list()


@app.route('/getUser', methods=['GET'])
def get_user():
    return User.user.get_user()


@app.route('/delUser', methods=['DELETE'])
def delete_user():
    return User.user.delete_user()


@app.route('/onEditUser', methods=['PUT'])
def update_user():
    return User.user.update_user()


@app.route('/getAvatar', methods=['GET'])
def get_avatar():
    return User.user.get_avatar()


@app.route('/getVideoList', methods=['GET'])
def get_video_list():
    return Video.video.get_video_list()


@app.route('/getMusicList', methods=['GET'])
def get_music_list():
    return Music.music.get_music_list()


if __name__ == '__main__':
    app.run()
