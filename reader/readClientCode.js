fetch('/read/get-data')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const blogList = document.getElementById('blogList');

        data.forEach(blog => {
            const listItem = document.createElement('li');
            const deleteButton = document.createElement('button')
            const updateButton = document.createElement('button')
            const headline = document.createElement('p')
            const content = document.createElement('p')
            const readMinute = document.createElement('span')
            const timestamp = document.createElement('span')
            const topLine = document.createElement('hr')
            const bottomLine  = document.createElement('hr')
            const authorOutput = document.createElement('span')
            const settingIcon = document.createElement('img')
            const settingData = document.createElement('div')
            const settingAdditionalInfo = document.createElement('p')
            const settingRecommendations = document.createElement('p')
            const statusText = document.createElement('p')
            // style
            deleteButton.classList.add('deleteButton')
            updateButton.classList.add('updateButton')
            headline.classList.add('headline')
            content.classList.add('content')
            authorOutput.classList.add('authorName')
            timestamp.classList.add('timestamp')
            topLine.classList.add('wrapper__line')
            bottomLine.classList.add('wrapper__line')
            content.classList.add('wrapper__content')
            settingIcon.classList.add('settingIcon')
            settingData.classList.add('settingData')
            // text content
            deleteButton.textContent = "Удалить"
            updateButton.textContent = "Изменить"
            headline.textContent = blog.headline;
            content.textContent = blog.content 
            settingIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAACWlpbW1taZmZn6+vrT09N4eHipqanDw8ONjY3q6ura2trv7+9lZWVOTk4eHh4XFxdDQ0NcXFzJycmioqKysrLk5OQsLCxUVFRPT080NDS3t7etra3u7u5oaGgRERFLQzcDAAACXklEQVR4nO3d6VbCMBCGYUIXqpRW1OIu3v9VKqJoadIfnqlz+HifK/jmdEmXZDKbAQAAAAAAAAAAAAAAAAD+pMybtm2bvPQOMpHuKny76rzDTOAi9F14B7J2GY5dekeytRgUGMLCO5SleaTAEObeseyU0QJD0LmnXicqvPYOZuX4Nqp3Q71JVnjjHc3GKllgCIV3OBO3IxXeeocz0Y1UqPH0Fh8M9zSGRP0K85EKc+9wJjYjFW68w5m4G6nwzjucieI+WeC9xngYeTf8pvKOuExWuPSOZiV1EFUO4Yen+FXoHctQ/DyVOUd36vWgvnXtHcrWsj0qsJU6gp+qXoGVd5xJPD/sz9X1w7N3lMkUdVmWtciDDAAAAAAAAAAAOGVFVuXzvMpUf1yUP9PZF5l3mAmsmt7/w+3KO5C14UxojamlBy+RiQoac9q+xOeyCx3F12iBIehci02iwq13MCtZosAQVAaN2LKuPZHFXUWyQJX1FumTVOU0rUYqfPEOZ0J/rj7rLU7f2HWoMUVR/16qPx7qP9Mkl3KrnKSz9LtF4x3MTGolsM77YeIdX2Wt+qfYdxqNZ9KD4VGUOoI7R99LG6Fr8CAT/+a9o/7fAgAAAAAAAAAAnBD1PlEb8V5f/ZbQGpOhfpPvuVe/Df5ya/VN1O99Ge8k/OQdy458D1r9PsLyvaDH+nl7Z7Oh35Ndv6++/lx9/fUW+hXq7zOjv1eQ/n5P+nt2ncG+a/p7553B/of6e1iewT6kZ7CX7HDc1xjr+9T3dN4pu+axfWw6oXsoAAAAAAAAAAAAAAAAAPyvd5spElBbklXaAAAAAElFTkSuQmCC'


            showStatus(statusText, blog.status)
            defineTime(settingAdditionalInfo,blog.length)
            showSymbol(settingRecommendations, blog.length)
            showDateInformation(blog.data_publication, timestamp)
            authorOutput.textContent = blog.author

            deleteButton.addEventListener('click', ()=> {
                deleteBlog(blog.id)
            })

            updateButton.addEventListener('click', ()=> {
                updateBlog(blog.id, blog.content)
                document.querySelector('.updateData').setAttribute('style', 'display: block')
            })
            let counter = 0
            settingIcon.addEventListener('click', () => {
                counter++;
                if (counter % 2 == 0){
                    settingData.setAttribute('style', 'display: none')
                }else {
                    settingData.setAttribute('style', 'display: block')
                }
            })

            settingData.append(settingAdditionalInfo)
            settingData.append(settingRecommendations)
            // settingData.append(deleteButton)

            listItem.append(headline)
            listItem.append(timestamp)
            listItem.append(topLine)
            listItem.append(content)
            listItem.append(statusText)
            listItem.append(bottomLine)
            listItem.append(updateButton)
            listItem.append(deleteButton)
            listItem.append(settingIcon)
            listItem.append(settingData)
            blogList.appendChild(listItem);

        });
    })
    .catch(error => console.error('Ошибка при получении данных:', error));

async function deleteBlog(blogId) {
        try {
            const response = await fetch(`/read/delete-blog/${blogId}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data.message);
            alert('Deleted')
            location.reload()
            
        } catch (error) {
            console.error('Ошибка при удалении блога:', error);
        }
    }

async function updateBlog(blogId, updatedData) {
    document.querySelector('.updateDataId').value = blogId
    document.querySelector('.updateDataContent').value = updatedData

}

// date
let month;
let DATE_IMG = "https://cdn3.iconfinder.com/data/icons/flaticons-1/24/flaticon_clock1-512.png"  
function showDateInformation(time, dateText){  
    determineMonth(Number(time.slice(6,7)));

    const imgElement = document.createElement('img');
    imgElement.src = DATE_IMG;
    imgElement.classList.add('wrapper_headline__img')

    const textNode = document.createTextNode(`${time.slice(8,10)} ${month}, ${time.slice(0,4)}`);

    dateText.innerHTML = '';

    dateText.appendChild(imgElement);
    dateText.appendChild(textNode);
}

function determineMonth(monthOutput){
    console.log(monthOutput);
    switch (monthOutput) {
        case 1:
            month = "Января"
            break;
        case 2:
            month = "Февраля"

            break;
        default:
            break;
    }

}

document.querySelector('.closeButton').onclick = function (){
    document.querySelector('.updateData').setAttribute('style', 'display: none')
}

// setting

function showSymbol(content, symbol){
    content.textContent = `Символов: ${symbol}`
}

function showStatus(content, status){
    if (status !== null){
        content.textContent = `(${status})`
    }
    content.classList.add('statusStyle')
}

function defineTime(content, len){
    let averageReadingSpeed = 500
    console.log(len);
    if (Math.round(len / averageReadingSpeed) > 0){
        content.textContent = `Читать: ${(len / averageReadingSpeed).toFixed(1)} мин`
    }else {
        content.textContent = `Читать: ${Math.round((len /averageReadingSpeed) * 60 )} сек`
    }
}

