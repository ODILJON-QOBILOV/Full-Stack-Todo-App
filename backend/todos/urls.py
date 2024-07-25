from . import views
from django.urls import path

urlpatterns = [
    path("todo/", views.TodoListView.as_view()),
    path("todo/<int:pk>/", views.DetailTodoView.as_view()),
    path('todo/delete/<int:pk>/', views.DeleteTodoApiView.as_view()),
    path('todo/update/<int:pk>/', views.UpdateTodoApiView.as_view()),
]
