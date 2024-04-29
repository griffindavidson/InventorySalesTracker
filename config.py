import os

class Config(object):
    SECRET = os.environ.get('SECRET') or 'secret'