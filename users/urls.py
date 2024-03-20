from django.urls import path
from .views import UserList, UserDetail, LogoutView, ValidateSessionView
from .views import login, validate_login

urlpatterns = [
    path('', UserList.as_view(), name='user-list'),
    path('<int:pk>/', UserDetail.as_view(), name='user-detail'),
    # path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('validate-session/', ValidateSessionView.as_view()),
    # path('fetch-user-role/', FetchUserRoleView.as_view(), name='fetch_user_role'),
    path('login/', login, name='login'),  # URL for login endpoint
    path('validate-login/', validate_login, name='validate_login'),
]
