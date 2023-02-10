from django.urls import path
import views

urlpatterns = [
    path('login', views.login),
    path('medicamentos', views.get_medicamentos),
    path('farmacias', views.get_farmacias)
]
