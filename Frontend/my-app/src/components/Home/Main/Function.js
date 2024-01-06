const myFunction=()=>{
    const menuItems=document.querySelectorAll('.menu-item');
    const messagesNotification=document.querySelector('#messages-notifications');
    const messages=document.querySelector('.messages');
    const message=messages.querySelectorAll('.message');
    const messageSearch=document.querySelector('#message-search');
    const theme=document.querySelector('#theme');
    const themeModel=document.querySelector('.customize-theme');
    const fontSizes=document.querySelectorAll('.choose-size span');
    const root=document.querySelector(':root');
    const colorPalette=document.querySelectorAll('.choose-color span');
    const bg1=document.querySelector('.bg-1');
    const bg2=document.querySelector('.bg-2');
    const bg3=document.querySelector('.bg-3');


    const changeActiveItem=()=>{
        menuItems.forEach(item=>{
            item.classList.remove('active');
        })
    }

    menuItems.forEach(item=>{
        item.addEventListener('click',()=>{
            changeActiveItem();
            item.classList.add('active');
            if(item.id != 'notifications'){
                document.querySelector('.notifications-popup').style.display='none';
            }
            else{
                document.querySelector('.notifications-popup').style.display='block';
                document.querySelector('#notifications .notification-count').style.display='none';
            }
        })
    })

    messagesNotification.addEventListener('click',()=>{
        messages.style.boxShadow='0 0 1rem var(--color-primary)';
        messagesNotification.querySelector('.notification-count').style.display='none';
        setTimeout(()=>{
            messages.style.boxShadow='none';
        },2000);
    })

    const searchMessage=()=>{
        const val=messageSearch.value.toLowerCase();
        message.forEach(user=>{
            let name=user.querySelector('h5').textContent.toLowerCase();
            if(name.indexOf(val)!=-1){
                user.style.display='flex';
            }
            else{
                user.style.display='none';
            }
        })
    }

    messageSearch.addEventListener('keyup',searchMessage);

    const openThemeModel=() =>{
        themeModel.style.display='grid';
    }


    const closeThemeModel=(e)=>{
        if(e.target.classList.contains('customize-theme')){
            themeModel.style.display='none';
            }
    }
    themeModel.addEventListener('click',closeThemeModel);
    theme.addEventListener('click',openThemeModel);

    const removeSizeSelector=()=>{
        fontSizes.forEach(size=>{
            size.classList.remove('active');
        })
    }

    fontSizes.forEach(size=>{
        size.addEventListener('click',()=>{
            removeSizeSelector();
            let fontsize;
            size.classList.toggle('active');
            if(size.classList.contains('font-size-1')){
                fontsize='10px';
                root.style.setProperty('----sticky-top-left','5.4rem');
                root.style.setProperty('----sticky-top-right','5.4rem');
            }else if(size.classList.contains('font-size-2')){
                fontsize='13px';
                root.style.setProperty('----sticky-top-left','5.4rem');
                root.style.setProperty('----sticky-top-right','-7rem');
            }else if(size.classList.contains('font-size-3')){
                fontsize='16px';
                root.style.setProperty('----sticky-top-left','-2rem');
                root.style.setProperty('----sticky-top-right','-17rem');
            }else if(size.classList.contains('font-size-4')){
                fontsize='19px';
                root.style.setProperty('----sticky-top-left','-5rem');
                root.style.setProperty('----sticky-top-right','-25rem');
            }else if(size.classList.contains('font-size-5')){
                fontsize='22px';
                root.style.setProperty('----sticky-top-left','-12rem');
                root.style.setProperty('----sticky-top-right','-35rem');
            }
            document.querySelector('html').style.fontSize=fontsize;

        })
        
    })



    const changeActiveColor=()=>{
        colorPalette.forEach(color=>{
            color.classList.remove('active');
        })
    }

    colorPalette.forEach(color =>{
        color.addEventListener('click',()=>{
            changeActiveColor();
            let primaryhue;
            if(color.classList.contains('color-1')){
                primaryhue=252;
            }else if(color.classList.contains('color-2')){
                primaryhue=52;
            }else if(color.classList.contains('color-3')){
                primaryhue=352;
            }else if(color.classList.contains('color-4')){
                primaryhue=152;
            }else if(color.classList.contains('color-5')){
                primaryhue=202;
            }
            color.classList.add('active');
            root.style.setProperty('--primary-color-hue',primaryhue);
        })
    })


    let lightcolor;
    let whitecolor;
    let darkcolor;

    const changeBG=()=>{
        root.style.setProperty('--light-color-lightness',lightcolor);
        root.style.setProperty('--white-color-lightness',whitecolor);
        root.style.setProperty('--dark-color-lightness',darkcolor);
    }

    bg1.addEventListener('click',()=>{

        bg1.classList.add('active');

        bg3.classList.remove('active');
        bg2.classList.remove('active');
        window.location.reload();
    })

    bg2.addEventListener('click',()=>{
        darkcolor='95%';
        whitecolor='20%';
        lightcolor='15%';

        bg2.classList.add('active');

        bg1.classList.remove('active');
        bg3.classList.remove('active');
        changeBG();
    })

    bg3.addEventListener('click',()=>{
        darkcolor='95%';
        whitecolor='10%';
        lightcolor='0%';

        bg3.classList.add('active');

        bg1.classList.remove('active');
        bg2.classList.remove('active');
        changeBG();
    })

};

export default myFunction;