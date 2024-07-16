
from django.urls import path
from .views import index, climate, eco_corp, glob_war, int_sec, popl_up

urlpatterns = [
    path('', index, name='index'),
    path('climate/', climate, name='climate'),
    path('eco-corp/', eco_corp, name='eco_corp'),
    path('glob-war/', glob_war, name='glob_war'),
    path('int-sec/', int_sec, name='int_sec'),
    path('popl-up/', popl_up, name='popl_up'),
]
