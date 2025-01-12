from src.repositories.User import UserRepository
from src.Service.User.User import UserService

def user_service():
    return UserService(UserRepository)