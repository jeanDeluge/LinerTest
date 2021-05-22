# SERVER 구동

* config/config 파일에서 다음과 같이 환경변수 설정

    "username": env.MYSQL_USERNAME,
    "password": env.MYSQL_PASSWORD,
    "database": env.MYSQL_DATABASENAME,
    "host": env.MYSQL_HOST,
    "dialect": "mysql"


1. vim, root dir (linertest) 에서 cd server 으로 /LinerTest/server로 진입
2. npm start 를 통해서 서버를 실행
3. 다른 vim 윈도우에서 같은 디렉토리에서 npm run migration 실행

4. npm run undomig : 모든 마이그레이션 연결을 끊음.

# API
1. GET , 아이디 생성, 

    Body
    {

        "userId": "jeanDeluge"
    
    }

2. POST , /saveHighlight 하이라이트 생성

    Body, json
    {

        "userId":  "jeanDeluge",
        "pageUrl" : "www.getliner.com/4",
        "colorHex" : "#fffff8",
        "text": "라이너 등록함, 15"
    
    }

3. PUT, /updateHighlights 하이라이트 수정

    Body,json
    {

        "userId":  "jeanDeluge", //required
        "highlightId" : 50, //required
        "colorHex" : "#fffff0", //required either colorHex or text
        "text" : "변경된 텍스트입니다"
    
    }

4. POST, /readHighlight 페이지내 하이라이트 정보가져오기

    Body,json
    {

        "userId":  "jeanDeluge", //required
        "pageUrl" : "www.getliner.com" //required
    
    }

5. POST,/readPagewithHighlights 유저가 하이라이트한 정보와 페이지 가져오기

    Body,json
    {
    
        "userId": "jeanDeluge" //required
    
    }

6. DELETE /deleteHighlight 하이라이트 삭제
    
    Body.json
    {
        
        "userId":"jeanDeluge" //required
        "highlightId": "12"//required
    
    }
7. PUT /updateUserTheme    유저의 하이라이트 테마 변경

    Body, json
    {
      
        "userId":"jeanDeluge" //required
        "themeId" : 2 //required
    
    }
# 데이터 구조

User {

    id : int [pk, increment]
    theme_Id : int 
    page_Id int
}

Highlights {

    id int [pk, increment]
    text : varchar
    colorHex : varchar

}

Page {

    id int [pk, increment]
    page_Url varchar
    highlights_Id int
}

Theme { //이미 정해져 있음.

    id int [pk, increment]
    color1 varchar
    color2 varchar
    color3 varchar

}


User : Page = 1 : n => 유저는 여러개의 페이지를 가질 수 있다.
User : Theme = m : n => 유저는 여러개의 테마를 가질 수 있다.
Page : Highlight = 1: n =>  페이지는 여러개의 하이라이트를 가질 수 있다. 
User : Highlight = 1: n => 유저는 여러개의 하이라이트를 가질 수 있다.
=> join으로 유저 => 페이지 => 하이라이트로 접근가능
# API
