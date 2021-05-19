# 데이터 구조

User {

    id : int [pk, increment]
    theme_Id : int 
    highlights_Id : int
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
}

Theme { //이미 정해져 있음.
    id int [pk, increment]
    color1 varchar
    color2 varchar
    color3 varchar
}

User : Highlights = 1 : n => 유저는 여러개의 하이라이트를 가질 수 있다.
User : Page = 1 : n => 유저는 여러개의 페이지를 가질 수 있다.
User : Theme = 1 : n => 유저는 여러개의 테마를 가질 수 있다.

Page : Highlight = 1: n =>  페이지는 여러개의 하이라이트를 가질 수 있다. 