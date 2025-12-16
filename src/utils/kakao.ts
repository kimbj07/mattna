// Kakao SDK 타입 정의
declare global {
  interface Window {
    Kakao: any;
    kakao: any;
  }
}

// Kakao SDK 초기화
export const initKakao = () => {
  if (window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
  }
};

// Kakao 로그인
export const loginWithKakao = () => {
  return new Promise((resolve, reject) => {
    window.Kakao.Auth.login({
      success: (authObj: any) => {
        console.log('Kakao login success:', authObj);
        resolve(authObj);
      },
      fail: (err: any) => {
        console.error('Kakao login failed:', err);
        reject(err);
      }
    });
  });
};

// 사용자 정보 가져오기
export const getKakaoUserInfo = () => {
  return new Promise((resolve, reject) => {
    window.Kakao.API.request({
      url: '/v2/user/me',
      success: (res: any) => {
        console.log('User info:', res);
        resolve(res);
      },
      fail: (err: any) => {
        console.error('Failed to get user info:', err);
        reject(err);
      }
    });
  });
};

// Kakao 로그아웃
export const logoutKakao = () => {
  return new Promise((resolve, reject) => {
    if (!window.Kakao.Auth.getAccessToken()) {
      console.log('Not logged in');
      resolve(null);
      return;
    }

    window.Kakao.Auth.logout((response: any) => {
      console.log('Logout success:', response);
      resolve(response);
    });
  });
};
