# 社内ハッカソンで作成したもの

## How to start
1. https://coders-shelf.com/react-firebase-image-upload/ の手順でfirebaseのstoregeを登録
1. Authenticateで匿名ユーザーを有効にする
1. アプリを登録し、SDKでfirevaseConfig = {
    "apiKey": "",
        ・
        ・
        ・
    "appId": ""
  }
の中身をsrc/config/firebaseConfig.json.samoleにコピペし、ファイル名をfirebaseConfig.jsonにする
1. yarn start