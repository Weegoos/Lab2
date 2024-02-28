

fetch('/content/get-img')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
       const slider = document.querySelector('.wrapper')
        data.forEach(blog => {
            const listItem = document.createElement('div');
            const image = document.createElement('img')
            const arrawUp = document.createElement('button')
            const arrawDown = document.createElement('button')
            const currentPage = document.createElement('span')
            const maxPage = document.createElement('span')
            const headline = document.createElement('p')
            const description =  document.createElement('p')
            // style
            arrawUp.classList.add('arrawUp')
            arrawDown.classList.add('arrawDown')
            listItem.classList.add('slider')
            currentPage.classList.add('currentPage')
            maxPage.classList.add('maxPage')
            headline.classList.add('headline')
            description.classList.add('description')

            // content
            arrawUp.innerHTML = "&uarr;"
            arrawDown.innerHTML = "&darr;"
            maxPage.innerHTML = '/3'
            currentPage.innerHTML = 1
            image.src = blog.img1
            headline.innerHTML = blog.headline1
            description.innerHTML = blog.description1

            listItem.append(headline)
            listItem.append(description)
            listItem.append(image)
            listItem.append(arrawUp)
            listItem.append(arrawDown)
            listItem.append(currentPage)
            listItem.append(maxPage)


            slider.appendChild(listItem);
            let currentPageCounter = 1;
            let maxPageCounter = 3;

            arrawUp.addEventListener('click', function (){
                if (currentPageCounter < maxPageCounter){
                    currentPageCounter++;
                        currentPage.innerHTML = currentPageCounter
                        if (currentPageCounter === 1){
                            image.src = blog.img1
                        }else if (currentPageCounter === 2){
                            image.src = blog.img2
                            console.log(blog.img2);
                        }else {
                            image.src = blog.img3
                        }
                    }
            })

            arrawDown.addEventListener('click', function (){
                console.log("down");
                if (currentPageCounter > 1){
                    currentPageCounter--;
                        currentPage.innerHTML = currentPageCounter
                        if (currentPageCounter === 1){
                            image.src = blog.img1
                        }else if (currentPageCounter === 2){
                            image.src = blog.img2
                            console.log(222);

                        }else {
                            image.src = blog.img3
                        }
                    }
            })
        });
    })
    .catch(error => console.error('Ошибка при получении данных:', error));

    // function changeNumberContent(arrawUp, arrawDown, currentPageText, img1, img2, img3){
    //     let maxPage = 3
    //     currentPageText.innerHTML = 1
    //     arrawUp.addEventListener('click', function (){
    //         if (currentPage < maxPage){
    //             currentPage++;
    //             currentPageText.innerHTML = currentPage
    //             changeContent(null,null, null,currentPage)
    //             if (currentPage == 1){
    //                 // image.src = img1
    //                 console.log(777);
    //             }
    //         }

    //     })
    
    //     arrawDown.addEventListener('click', function (){
    //         if (currentPage > 1){
    //             currentPage--;
    //             currentPageText.innerHTML = currentPage
    //             changeContent(null,null, null,currentPage)
                
    //         }

    //     })
    //     // console.log(img1);
    // }
    // changeNumberContent()