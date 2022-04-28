from django.urls import path
from . import views
from .views import CustomLoginView, ResultList, RegisterPage,gameList,ReactionTime
from django.contrib.auth.views import LogoutView
urlpatterns = [
    path('', views.gameList.as_view(),name='games'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('accounts/login/', CustomLoginView.as_view(), name='login'),
    path('results/', ResultList.as_view(), name='results'),
    path('logout/',LogoutView.as_view(next_page='login'), name = 'logout'),
    path('register/',RegisterPage.as_view(), name = 'register'),
    #path('reaction_time/',ReactionTime.as_view(), name = 'reaction_time'),
    path('reaction_time/',views.ReactionTime, name = 'reaction_time'),
    path('memory_test/',views.MemoryTest, name = 'memory_test'),
    path('type_speed/',views.TypeSpeed, name = 'type_speed'),
    path('verbal/',views.Verbal, name = 'verbal'),
]