from django.shortcuts import render
from django.http import JsonResponse
from .models import Project, Flow, Node
import requests

def index(request):
    return render(request, 'index.html')


def climate(request):
    requests.post("http://localhost:5000/generate-graph")
    return render(request, 'climate.html', {'image_url': '/static/graph.png'})

# Añadir vistas similares para eco_corp, glob_war, int_sec, popl_up
def eco_corp(request):
    requests.post("http://localhost:5000/generate-graph")
    return render(request, 'eco_corp.html', {'image_url': '/static/graph.png'})

def glob_war(request):
    requests.post("http://localhost:5000/generate-graph")
    return render(request, 'glob_war.html', {'image_url': '/static/graph.png'})

def int_sec(request):
    requests.post("http://localhost:5000/generate-graph")
    return render(request, 'int_sec.html', {'image_url': '/static/graph.png'})

def popl_up(request):
    requests.post("http://localhost:5000/generate-graph")
    return render(request, 'popl_up.html', {'image_url': '/static/graph.png'})