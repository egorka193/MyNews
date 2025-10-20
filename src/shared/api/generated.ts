import { api } from "./api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    appControllerGetHello: build.query<
      AppControllerGetHelloApiResponse,
      AppControllerGetHelloApiArg
    >({
      query: () => ({ url: `/` }),
    }),
    userAuthControllerSignUp: build.mutation<
      UserAuthControllerSignUpApiResponse,
      UserAuthControllerSignUpApiArg
    >({
      query: (queryArg) => ({
        url: `/user/auth/sign-up`,
        method: "POST",
        body: queryArg.signUpRequestDto,
      }),
    }),
    userAuthControllerSignIn: build.mutation<
      UserAuthControllerSignInApiResponse,
      UserAuthControllerSignInApiArg
    >({
      query: (queryArg) => ({
        url: `/user/auth/sign-in`,
        method: "POST",
        body: queryArg.signInRequestDto,
      }),
    }),
    userAuthControllerRefresh: build.mutation<
      UserAuthControllerRefreshApiResponse,
      UserAuthControllerRefreshApiArg
    >({
      query: () => ({ url: `/user/auth/refresh`, method: "POST" }),
    }),
    userControllerGetMe: build.query<
      UserControllerGetMeApiResponse,
      UserControllerGetMeApiArg
    >({
      query: () => ({ url: `/users/me` }),
    }),
    userControllerUpdate: build.mutation<
      UserControllerUpdateApiResponse,
      UserControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/users`,
        method: "PATCH",
        body: queryArg.userUpdateRequestDto,
      }),
    }),
    newsControllerGetMany: build.query<
      NewsControllerGetManyApiResponse,
      NewsControllerGetManyApiArg
    >({
      query: (queryArg) => ({
        url: `/news`,
        params: {
          size: queryArg.size,
          nextCursor: queryArg.nextCursor,
          forLastWeek: queryArg.forLastWeek,
        },
      }),
    }),
    newsControllerGetTop: build.query<
      NewsControllerGetTopApiResponse,
      NewsControllerGetTopApiArg
    >({
      query: () => ({ url: `/news/top` }),
    }),
    newsControllerGetLast: build.query<
      NewsControllerGetLastApiResponse,
      NewsControllerGetLastApiArg
    >({
      query: (queryArg) => ({
        url: `/news/top-ids`,
        params: {
          amount: queryArg.amount,
        },
      }),
    }),
    newsControllerGetOne: build.query<
      NewsControllerGetOneApiResponse,
      NewsControllerGetOneApiArg
    >({
      query: (queryArg) => ({ url: `/news/${queryArg.id}` }),
    }),
    healthcheckControllerLiveness: build.query<
      HealthcheckControllerLivenessApiResponse,
      HealthcheckControllerLivenessApiArg
    >({
      query: () => ({ url: `/health/liveness` }),
    }),
    healthcheckControllerReadiness: build.query<
      HealthcheckControllerReadinessApiResponse,
      HealthcheckControllerReadinessApiArg
    >({
      query: () => ({ url: `/health/readiness` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as generatedApi };
export type AppControllerGetHelloApiResponse = unknown;
export type AppControllerGetHelloApiArg = void;
export type UserAuthControllerSignUpApiResponse =
  /** status 200 Используйте этот запрос, чтобы зарегестрировать пользователя и получить пару access/refresh tokens для дальнейших запросов. Время жизни токена 24 часа. */ SignUpResponseDto;
export type UserAuthControllerSignUpApiArg = {
  signUpRequestDto: SignUpRequestDto;
};
export type UserAuthControllerSignInApiResponse =
  /** status 200 Используйте этот запрос, чтобы получить пару access/refresh tokens для дальнейших запросов. Время жизни токена 24 часа. */ SignInResponseDto;
export type UserAuthControllerSignInApiArg = {
  signInRequestDto: SignInRequestDto;
};
export type UserAuthControllerRefreshApiResponse =
  /** status 200 Получить новую пару access/refresh токенов по refresh токену */ RefreshTokenResponseDto;
export type UserAuthControllerRefreshApiArg = void;
export type UserControllerGetMeApiResponse =
  /** status 200 Получить мой профиль */ UserGetInfoResponseDto;
export type UserControllerGetMeApiArg = void;
export type UserControllerUpdateApiResponse =
  /** status 200 Редактировать профиль пользователя */ UserUpdateResponseDto;
export type UserControllerUpdateApiArg = {
  userUpdateRequestDto: UserUpdateRequestDto;
};
export type NewsControllerGetManyApiResponse =
  /** status 200 Получить список новостей с курсорной пагинацией */ NewsGetManyResponseDto;
export type NewsControllerGetManyApiArg = {
  size?: number;
  nextCursor?: string;
  forLastWeek?: boolean;
};
export type NewsControllerGetTopApiResponse =
  /** status 200 Получить 10 топовых новостей */ NewsGetTopResponseDto;
export type NewsControllerGetTopApiArg = void;
export type NewsControllerGetLastApiResponse =
  /** status 200 Получить ID топовых новостей */ NewsGetLastResponseDto;
export type NewsControllerGetLastApiArg = {
  /** Количество, необходимое для получения ID топовых новостей */
  amount: number;
};
export type NewsControllerGetOneApiResponse =
  /** status 200 Получить новость по ID */ NewsGetOneResponseDto;
export type NewsControllerGetOneApiArg = {
  id: string;
};
export type HealthcheckControllerLivenessApiResponse = unknown;
export type HealthcheckControllerLivenessApiArg = void;
export type HealthcheckControllerReadinessApiResponse = unknown;
export type HealthcheckControllerReadinessApiArg = void;
export type SignUpResponseDto = {
  /** JWT access токен. Добавь его в заголовок 'Authorization' для энд-поинтов, которые требуют авторизации пользователя. */
  accessToken: string;
  /** JWT refresh токен для обновления access-токена. Укажи его в энд-поинте '/user/auth/refresh' когда access-токен истечет. */
  refreshToken: string;
};
export type SignUpRequestDto = {
  /** Имя пользователя, должно быть не менее 1 и не более 255 символов */
  username: string;
  /** Пароль, должен быть не менее 8 и не более 32 символов, иметь хотя бы одну заглавную букву (A-Z), хотя бы одну строчную букву (a-z) и хотя бы одну цифру (0-9) */
  password: string;
};
export type SignInResponseDto = {
  /** JWT access токен. Добавь его в заголовок 'Authorization' для энд-поинтов, которые требуют авторизации пользователя. */
  accessToken: string;
  /** JWT refresh токен для обновления access-токена. Укажи его в энд-поинте '/user/auth/refresh' когда access-токен истечет. */
  refreshToken: string;
};
export type SignInRequestDto = {
  /** Имя пользователя, должно быть не менее 1 и не более 255 символов */
  username: string;
  /** Пароль, должен быть не менее 8 и не более 32 символов, иметь хотя бы одну заглавную букву (A-Z), хотя бы одну строчную букву (a-z) и хотя бы одну цифру (0-9) */
  password: string;
};
export type RefreshTokenResponseDto = {
  /** JWT access токен. Добавь его в заголовок 'Authorization' для энд-поинтов, которые требуют авторизации пользователя. */
  accessToken: string;
  /** JWT refresh токен для обновления access-токена. Укажи его в энд-поинте '/user/auth/refresh' когда access-токен истечет. */
  refreshToken: string;
};
export type UserGetInfoResponseDto = {
  id: string;
  /** Имя пользователя, должно быть не менее 1 и не более 255 символов */
  username: string;
  createdAt: string;
  updatedAt: string;
};
export type UserUpdateResponseDto = {
  id: string;
  /** Имя пользователя, должно быть не менее 1 и не более 255 символов */
  username: string;
  createdAt: string;
  updatedAt: string;
};
export type UserUpdatePasswordDto = {
  /** Старый пароль, должен быть не менее 8 и не более 32 символов, иметь хотя бы одну заглавную букву (A-Z), хотя бы одну строчную букву (a-z) и хотя бы одну цифру (0-9) */
  password: string;
  /** Новый пароль, должен быть не менее 8 и не более 32 символов, иметь хотя бы одну заглавную букву (A-Z), хотя бы одну строчную букву (a-z) и хотя бы одну цифру (0-9) */
  newPassword: string;
};
export type UserUpdateRequestDto = {
  /** Имя пользователя, должно быть не менее 1 и не более 255 символов */
  username?: string | null;
  passwordData?: UserUpdatePasswordDto | null;
};
export type GetNewsResponseDto = {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl?: string | null;
  createdAt: string;
};
export type CursorPaginatedMeta = {
  hasMore: boolean;
  nextCursor?: string | null;
  total?: number | null;
};
export type NewsGetManyResponseDto = {
  results: GetNewsResponseDto[];
  meta: CursorPaginatedMeta;
};
export type NewsGetTopResponseDto = {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl?: string | null;
  createdAt: string;
};
export type NewsGetLastResponseDto = {
  ids: string[];
};
export type NewsGetOneResponseDto = {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl?: string | null;
  createdAt: string;
};
export const {
  useAppControllerGetHelloQuery,
  useLazyAppControllerGetHelloQuery,
  useUserAuthControllerSignUpMutation,
  useUserAuthControllerSignInMutation,
  useUserAuthControllerRefreshMutation,
  useUserControllerGetMeQuery,
  useLazyUserControllerGetMeQuery,
  useUserControllerUpdateMutation,
  useNewsControllerGetManyQuery,
  useLazyNewsControllerGetManyQuery,
  useNewsControllerGetTopQuery,
  useLazyNewsControllerGetTopQuery,
  useNewsControllerGetLastQuery,
  useLazyNewsControllerGetLastQuery,
  useNewsControllerGetOneQuery,
  useLazyNewsControllerGetOneQuery,
  useHealthcheckControllerLivenessQuery,
  useLazyHealthcheckControllerLivenessQuery,
  useHealthcheckControllerReadinessQuery,
  useLazyHealthcheckControllerReadinessQuery,
} = injectedRtkApi;
