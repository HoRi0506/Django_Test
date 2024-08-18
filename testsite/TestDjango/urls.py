from django.urls import path
from . import views

app_name = "TestDjango"

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:member_id>/', views.detail, name='detail'),
    path('input/', views.input, name='input'),
    path('create/', views.create, name='create'),
    path('delete/<int:member_id>/', views.delete, name='delete'),
    path('editform/<int:member_id>/', views.editform, name='editform'),
    path('editsave/', views.editsave, name='editsave'),
]