import pymysql

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '123456',
    'database': 'violet',
    'charset': 'utf8',
    'cursorclass': pymysql.cursors.DictCursor
}


def create_db_connection():
    return pymysql.connect(**db_config)


# def get_user_list():
#     with create_db_connection() as db:
#         cursor = db.cursor()
#         cursor.execute("SELECT * FROM user")
#         return cursor.fetchall()
def get_user_list(search=None, page=None, per_page=None):
    with create_db_connection() as db:
        cursor = db.cursor()

        # 构建SQL查询语句
        query = "SELECT * FROM user"
        params = []

        # 添加搜索条件
        if search:
            query += " WHERE user LIKE %s"
            params.append(f"%{search}%")

        # 添加分页限制
        if page is not None and per_page is not None:
            offset = (page - 1) * per_page
            query += " LIMIT %s OFFSET %s"
            params.extend([per_page, offset])

        # 执行查询
        cursor.execute(query, params)
        return cursor.fetchall()


def add_user(user_data):
    with create_db_connection() as db:
        cursor = db.cursor()
        cursor.execute(
            "INSERT INTO user (id, user, phone, email, password, identity, avatar) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (user_data['id'], user_data['user'], user_data['phone'], user_data['email'], user_data['password'], user_data['identity'], user_data['avatar']))
        db.commit()


def update_user(user_data):
    with create_db_connection() as db:
        cursor = db.cursor()
        cursor.execute(
            "UPDATE user SET user=%s, phone=%s, email=%s, password=%s, identity=%s, avatar=%s WHERE id=%s",
            (user_data['user'], user_data['phone'], user_data['email'], user_data['password'], user_data['identity'], user_data['avatar'], user_data['id']))
        db.commit()


def delete_users(user_ids):
    with create_db_connection() as db:
        cursor = db.cursor()
        placeholders = ', '.join(['%s'] * len(user_ids))
        query = "DELETE FROM user WHERE id IN ({})".format(placeholders)
        cursor.execute(query, user_ids)
        db.commit()


def get_user(user_data):
    with create_db_connection() as db:
        cursor = db.cursor()
        cursor.execute('SELECT * FROM user WHERE id = %s', user_data)
        return cursor.fetchall()
