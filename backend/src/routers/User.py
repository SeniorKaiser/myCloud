from typing import Annotated
from fastapi import APIRouter, Depends, Request, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from src.dependencies.User import user_service
from src.Service.User.User import UserService
from src.dto.User import User, UserReg, UserFilesFolders
from src.dto.Token import Token

router = APIRouter(tags=["User"], prefix='/user')
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post('/reg', response_model=User)
async def registration(
    user: UserReg,
    user_service: Annotated[UserService, Depends(user_service)]
):
    return await user_service.registration(user)

@router.post("/login", response_model=Token)
async def login(
    response: Response,
    user_service: Annotated[UserService, Depends(user_service)],
    form_data: OAuth2PasswordRequestForm = Depends(),
) -> Token:
    return await user_service.login(response, form_data)

@router.get("/auth")
async def auth(
    request: Request,
    response: Response,
    user_service: Annotated[UserService, Depends(user_service)]
) -> User:
    return await user_service.auth(request=request, response=response)

@router.get("/first-layer-disk")
async def get_first_layer_disk(
    user_service: Annotated[UserService, Depends(user_service)],
    user: User = Depends(auth),
) -> UserFilesFolders:
    return await user_service.get_first_layer_disk(user["id"])

@router.delete("/delete/{user_id}")
async def delete(
    user_id: str,
    user_service: Annotated[UserService, Depends(user_service)]
):
    return await user_service.delete_user(user_id)
