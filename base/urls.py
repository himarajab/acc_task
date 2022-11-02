from django.urls import path
from . import views 

urlpatterns = [
    path('emailVerification/<uidb64>/<token>', views.activate, name='activate'),
    path('login/', views.login_page, name="login"),
    path('register/', views.register_page, name="register"),
    path('logout/', views.logout_user, name="logout"),
    path('', views.home_page, name="home"),
    path('account/', views.account_page, name="account"),
]