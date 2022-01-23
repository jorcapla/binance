import sys
from Application import app

if __name__ == '__main__':
    listening_port = 8888
    app.run(host="127.0.0.1", port=listening_port, debug=False)