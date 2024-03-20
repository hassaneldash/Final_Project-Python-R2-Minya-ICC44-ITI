from django.urls import path
# from .views import UserList, UserDetail, LogoutView, ValidateSessionView
from .views import login, activate, one_user, all_users

urlpatterns = [
    # path('', UserList.as_view(), name='user-list'),
    # path('<int:pk>/', UserDetail.as_view(), name='user-detail'),
    # path('login/', LoginView.as_view()),
    # path('logout/', LogoutView.as_view()),
    # path('validate-session/', ValidateSessionView.as_view()),
    # path('fetch-user-role/', FetchUserRoleView.as_view(), name='fetch_user_role'),
    # path('validate-login/', validate_login, name='validate_login'),
    path('login/', login, name='login'),  # URL for login endpoint
    path('activate/<uuid:token>/', activate, name='activate'),
    path('users_api', all_users,name='users_api'),
    path('one_user_api/<int:id>',one_user,name='one_user_api'),
    path('activate/<uuid:token>/', activate, name='activate'),
]
