from flask import Flask, render_template, Response, url_for
import subprocess
import os
import threading

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/climate')
def climate():
    return render_template('climate.html', video_url=url_for('video_feed', graph_name='climate'))

@app.route('/eco_corp')
def eco_corp():
    return render_template('eco_corp.html', video_url=url_for('video_feed', graph_name='eco_corp'))

@app.route('/glob_war')
def glob_war():
    return render_template('glob_war.html', video_url=url_for('video_feed', graph_name='glob_war'))

@app.route('/int_sec')
def int_sec():
    return render_template('int_sec.html', video_url=url_for('video_feed', graph_name='int_sec'))

@app.route('/popl_up')
def popl_up():
    return render_template('popl_up.html', video_url=url_for('video_feed', graph_name='popl_up'))

@app.route('/journalist')
def journalist():
    return render_template('journalist.html')

@app.route('/video_feed/<graph_name>')
def video_feed(graph_name):
    return Response(gen_video(graph_name), mimetype='multipart/x-mixed-replace; boundary=frame')

def gen_video(graph_name):
    command = [
        'ffmpeg',
        '-f', 'x11grab',
        '-r', '30',
        '-s', '1280x720',
        '-i', ':0.0',
        '-f', 'mpeg1video',
        '-b:v', '1000k',
        '-r', '30',
        '-'
    ]

    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    threading.Thread(target=stream_graph, args=(process.stdin, graph_name)).start()
    return process.stdout

def stream_graph(stdin, graph_name):
    script_path = os.path.join(app.root_path, 'static', 'graph_scripts', f'output_{graph_name}.js')
    command = f'node {script_path}'
    subprocess.run(command, shell=True, stdout=stdin, stderr=subprocess.PIPE)

@app.route('/render-graph/<graph_name>')
def render_graph(graph_name):
    script_path = os.path.join(app.root_path, 'static', 'graph_scripts', f'output_{graph_name}.js')
    with open(script_path, 'r') as file:
        script_content = file.read()

    return f'''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ForceGraph3D Example</title>
        <script src="https://unpkg.com/force-graph"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    </head>
    <body>
        <div id="3d-graph" style="width: 800px; height: 600px;"></div>
        <script>
            {script_content}
        </script>
    </body>
    </html>
    '''

def start_puppeteer():
    script_path = os.path.join(app.root_path, 'static', 'graph_scripts', 'output_climate.js')
    command = f'node {script_path}'
    subprocess.Popen(command, shell=True)

if __name__ == '__main__':
    puppeteer_thread = threading.Thread(target=start_puppeteer)
    puppeteer_thread.start()
    app.run(debug=True)
