localStorage.getItem = key => localStorage[key]===void 0? null: localStorage[key];
localStorage.setItem = (key, value) => (localStorage[key] = value);

var hasOwnProperty = {}.hasOwnProperty;

globalThis.hideBanners = (e) => {
    document
        .querySelectorAll(".banner.visible")
        .forEach((b) => b.classList.remove("visible"));
};
function setTheme(theme) {
    var themeLink = $(document).find('#themeLink');

    switch (theme) {
        case 'dark':
        case 'light':
        case 'halloween':
            themeLink.attr('href', "".concat(theme, ".css"));
            break;

        default:
            themeLink.attr('href', 'dark.css');
    }
}
const indexPage = $("#main");
let date = new Date();
if (date.getMonth() == 9 && date.getDate() == 31
    || date.getMonth() == 10 && date.getDate() == 1
) {
    this.setTheme('halloween');
} else {
    this.setTheme(localStorage.getItem('theme'))
}

if (localStorage.getItem('theme') == 'light') {
    indexPage.find('#themeToggleBtn').text('Black')
} else {
    indexPage.find('#themeToggleBtn').text('White')
}
indexPage
    .find("#themeToggleBtn")
    .click(() => {
        if (localStorage.getItem('theme') == 'light') {
            localStorage.setItem('theme', 'dark');
            indexPage.find('#themeToggleBtn').text('White')
        } else {
            localStorage.setItem('theme', 'light');
            indexPage.find('#themeToggleBtn').text('Black')
        }

        this.setTheme(localStorage.getItem('theme'))
    });
indexPage
    .find('#save')
    .click(() => {
        const data = {};
        Object
            .keys(localStorage)
            .filter(v => v.substr(0, 4) != 'goog')
            .forEach(key => data[key] = localStorage[key]);

        let blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const slice = blob.slice || blob.webkitSlice || blob.mozSlice;
        blob = slice.call(blob, 0, blob.size, 'application/octet-stream');
        const a = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        a.href = URL.createObjectURL(blob);
        a.download = `Remake_save_${new Date().toISOString().replace(':', '.')}.json`;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    });
indexPage
    .find('#load')
    .click(() => {
        const file = $(`<input type="file" name="file" accept="application/json" style="display: none;" />`)
        file.appendTo('body');
        file.click();
        file.on('change', (e) => {
            this.switch('loading');
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
                const data = JSON.parse(reader.result);
                for (const key in data) {
                    localStorage[key] = data[key];
                }
                this.switch('index');
                this.setTheme(localStorage.getItem('theme'))
                if (localStorage.getItem('theme') == 'light') {
                    indexPage.find('#themeToggleBtn').text('黑')
                } else {
                    indexPage.find('#themeToggleBtn').text('白')
                }
                this.hint('加载存档成功', 'success');
            }
            reader.readAsText(file);
        });
    });
const backgroundPage = $(`
    <div id="main">
        <div class="head" style="font-size: 1.6rem">Background and Rules</div>
        <div class="item">You’re now inside a human. As the leader of your colony, you must make good choices to survive in this hostile and strange environment.</div>
        <div class="item" style="margin-top:5%">Inside your human, you’ll encounter three different challenges that threaten your survival. You will select three attributes that will either save you or spell your doom.</div>
        <div class="item" style="margin-top:5%">If you pass an event with the appropriate attributes. Your population will be squared (population x population). Otherwise, your population will halve. Good luck!</div>      
        <button id="random" class="mainbtn" style="margin-top:5%">Next</button>
    </div>
    `);
indexPage
    .find('#restart')
    .click(() => {
        indexPage.detach();
        backgroundPage.appendTo("body")
    });
document.getElementById("Video1")
    .addEventListener('ended',function(){ 
        indexPage.detach();
        backgroundPage.appendTo("body")
    });

const factorsPage = $(`
    <div id="main">
        <div class="head" style="font-size: 1.6rem">Choose your attributes</div>
        <h3 class="item">Choose one from Category 1</h3>
        <ul id="talents1" class="selectlist">
            <li class="grade0b" id="penicillin">resistance to penicillin</li>
            <div id="p_function"></div>
            <li class="grade0b" id="oxacillin">resistance to oxacillin</li>
            <div id="o_function"></div>
        </ul>
        <h3 class="item">Choose one from Category 2</h3>
        <ul id="talents2" class="selectlist">
            <li class="grade0b" id="biofilm">biofilm</li>
            <div id="bio_function"></div>
            <li class="grade0b" id="β">Beta toxin</li>
            <div id="β_function"></div>
        </ul>
        <h3 class="item">Choose one from Category 3</h3>
        <ul id="talents3" class="selectlist">
            <li class="grade0b" id="α">Alpha toxin</li>
            <div id="α_function"></div>
            <li class="grade0b" id="δ">Delta toxin</li>
            <div id="δ_function"></div>
        </ul>
        <button id="random" class="mainbtn">Next</button>
    </div>
    `);
backgroundPage
.find('#random')
    .click(() => {
        backgroundPage.detach();
        factorsPage.appendTo("body")
    });


factorselected = new Set();
talents1selected = new Set();
talents2selected = new Set();
talents3selected = new Set();
allfactors = new Set();
allfactors.add("resistance to penicillin");
allfactors.add("resistance to oxacillin");
allfactors.add("biofilm");
allfactors.add("Beta toxin");
allfactors.add("Alpha toxin");
allfactors.add("Delta toxin");
const penicillin = factorsPage.find("#penicillin");
const oxacillin = factorsPage.find("#oxacillin");
const biofilm = factorsPage.find("#biofilm");
const β = factorsPage.find("#β");
const α = factorsPage.find("#α");
const δ = factorsPage.find("#δ");
const infection = factorsPage.find("#infection");
penicillin.click(() => {
    if(penicillin.hasClass('selected')) {
        penicillin.removeClass('selected');
        talents1selected.delete("resistance to penicillin");
        factorselected.delete("resistance to penicillin")
    } else{
        if(talents1selected.size<1){
            penicillin.addClass('selected'); 
            talents1selected.add("resistance to penicillin");
            factorselected.add("resistance to penicillin")
        } else{var banner = $(".banner");
        banner.addClass('visible');
        banner.find('.banner-message').text('Choose one attribute per category!');}
    }
});
penicillin.mouseover(() => {
    var p = $('#penicillin').offset();
    $("#p_function").css({
        left:p.left-15,
        top:p.top+10
    }).html('<p class="item" id="display1">resistance to the antibiotic penicillin</p>');
});
penicillin.mouseleave(() => {
    $("#display1").detach()
});

oxacillin.click(() => {
    if(oxacillin.hasClass('selected')) {
        oxacillin.removeClass('selected');
        talents1selected.delete("resistance to oxacillin");
        factorselected.delete("resistance to oxacillin")
    } else{
        if(talents1selected.size<1){
            oxacillin.addClass('selected'); 
            talents1selected.add("resistance to oxacillin");
            factorselected.add("resistance to oxacillin")
        } else{var banner = $(".banner");
        banner.addClass('visible');
        banner.find('.banner-message').text('Choose one attribute per category!');}
    }
});
oxacillin.mouseover(() => {
    var p = $('#oxacillin').offset();
    $("#o_function").css({
        left:p.left-15,
        top:p.top+10
    }).html('<p class="item" id="display2">resistance to the antibiotic oxacillin</p>');
});
oxacillin.mouseleave(() => {
    $("#display2").detach()
});

biofilm.click(() => {
    if(biofilm.hasClass('selected')) {
        biofilm.removeClass('selected');
        talents2selected.delete("biofilm");
        factorselected.delete("biofilm")
    } else{
        if(talents2selected.size<1){
            biofilm.addClass('selected'); 
            talents2selected.add("biofilm");
            factorselected.add("biofilm")
        } else{var banner = $(".banner");
        banner.addClass('visible');
        banner.find('.banner-message').text('Choose one attribute per category!');}
    }
});
biofilm.mouseover(() => {
    var p = $('#biofilm').offset();
    $("#bio_function").css({
        left:p.left-15,
        top:p.top+10
    }).html('<p class="item" id="display3">biofilm protects against antibiotics and facilitates evasion from immune cells</p>');
});
biofilm.mouseleave(() => {
    $("#display3").detach()
});

β.click(() => {
    if(β.hasClass('selected')) {
        β.removeClass('selected');
        talents2selected.delete("Beta toxin");
        factorselected.delete("Beta toxin")
    } else{
        if(talents2selected.size<1){
            β.addClass('selected'); 
            talents2selected.add("Beta toxin");
            factorselected.add("Beta toxin")
        } else{var banner = $(".banner");
        banner.addClass('visible');
        banner.find('.banner-message').text('Choose one attribute per category!');}
    }
});
β.mouseover(() => {
    var p = $('#β').offset();
    $("#β_function").css({
        left:p.left-15,
        top:p.top+10
    }).html('<p class="item" id="display4">Beta toxin kill the immune cell to disrupt immune system. </p>');
});
β.mouseleave(() => {
    $("#display4").detach()
});

α.click(() => {
    if(α.hasClass('selected')) {
        α.removeClass('selected');
        talents3selected.delete("Alpha toxin");
        factorselected.delete("Alpha toxin")
    } else{
        if(talents3selected.size<1){
            α.addClass('selected'); 
            talents3selected.add("Alpha toxin");
            factorselected.add("Alpha toxin")
        } else{var banner = $(".banner");
        banner.addClass('visible');
        banner.find('.banner-message').text('Choose one attribute per category!');}
    }
});
α.mouseover(() => {
    var p = $('#α').offset();
    $("#α_function").css({
        left:p.left-15,
        top:p.top+10
    }).html('<p class="item" id="display5">Alpha toxin and Delta toxin disrupt cellular membranes and kill the host cells.</p>');
});
α.mouseleave(() => {
    $("#display5").detach()
});
δ.click(() => {
    if(δ.hasClass('selected')) {
        δ.removeClass('selected');
        talents3selected.delete("Delta toxin");
        factorselected.delete("Delta toxin")
    } else{
        if(talents3selected.size<1){
            δ.addClass('selected'); 
            talents3selected.add("Delta toxin");
            factorselected.add("Delta toxin")
        } else{var banner = $(".banner");
        banner.addClass('visible');
        banner.find('.banner-message').text('Choose one attribute per category!');}
    }
});
δ.mouseover(() => {
    var p = $('#δ').offset();
    $("#δ_function").css({
        left:p.left-15,
        top:p.top+10
    }).html('<p class="item" id="display6">Alpha toxin and Delta toxin disrupt cellular membranes and kill the host cells.</p>');
});
δ.mouseleave(() => {
    $("#display6").detach()
});


const startPage = $(`
    <div class="selectedfactors" id="selectedfactors">
        <button id="but" class="mainbtn1">Show Selected Attributes</button>
        <div id="factors" style="margin-left:8%"></div>
    </div>
    <div id="main">
        <div class="head" style="font-size: 1.6rem">Initial Status</div>
        <div class="item" style="margin-top:10%">Initial bacterial population: 100</div> 
        <div class="item" style="margin-top:10%">Pass the event: bacteria population^2</div>   
        <div class="item" style="margin-top:10%">Failed to pass the event: bacteria population/2</div>      
        <button id="random" class="mainbtn" style="margin-top:10%">Go to Event 1</button>
    </div>
    `);

factorsPage
.find('#random')
    .click(() => {
        if(factorselected.size<3){
            var banner = $(".banner");
            banner.addClass('visible');
            banner.find('.banner-message').text('select three attributes to proceed');
        } else{
            factorsPage.detach();
            startPage.appendTo("body")
        }
    });

startPage
.find('#but')
.click(() => {
for (const i of  factorselected){
    const fa = $(`<div class="item">${i}</div>`);
    $('#factors').append(fa);
}
});



const event1Page = $(`
<div class="selectedfactors" id="selectedfactors">
        <button id="but" class="mainbtn1">Show Selected Attributes</button>
        <div id="factors" style="margin-left:8%"></div>
    </div>
<div id="main">
<div class="head" style="font-size: 1.6rem">Event 1</div>
<h3 class="item">Introduction</h3> 
<div class="item">Bacteria encounter immune cells early after initial infection. In order to colonise a host, bacteria must either evade or counteract immune responses.</div> 
<h3 class="item" style="margin-top:10%">Detailed event and requirements to pass</h3>   
<div class="item">You are welcomed by your human’s immune cells. Wait, this doesn’t seem like a warm welcome… they’re trying to kill you!</div> 
<div class="item" style="margin-top:5%"> Biofilm or Beta toxin is required</div>
<button id="random" class="mainbtn" style="margin-top:10%">Outcome of Event 1</button>
</div>
`);

startPage
    .find('#random')
    .click(() => {
        startPage.detach();
        event1Page.appendTo("body")
    });

event1Page
    .find('#but')
    .click(() => {
    for (const i of  factorselected){
        const fa = $(`<div class="item">${i}</div>`);
        $('#factors').append(fa);
    }
    });

const event1failPage = $(`
<div id="main">
<div class="head" style="font-size: 1.6rem">Event 1 Failed</div>
<div class="item">The reproduction of the bacteria population was inhibited in this event. Bacteria population is divided by two.</div>    
<h3 class="item">End notes of Event 1</h3> 
<div class="item" style="margin-top:5%"> immune cells will find and kill most of the invading bacteria, only a small precise of bacteria with special resistance can survive. </div>
<h3 class="item" style="margin-top:10%">Current bacteria population: 50</h3>
<button id="random" class="mainbtn" style="margin-top:10%">Next</button>
</div>
`);

const event1passPage = $(`
<div id="main">
<div class="head" style="font-size: 1.6rem">Event 1 Passed!</div>
<div class="item">The reproduction of the bacterial population was not inhibited in this event, and your numbers are growing!</div>   
<h3 class="item" style="margin-top:10%">End notes of Event 1</h3> 
<div class="item">Immune cells mount immune responses against bacteria shortly after they enter a person. To establish infection in a person, bacteria should either evade or disrupt immune responses.</div>
<h3 class="item" style="margin-top:10%">Current bacteria population: 10000</h3>
<button id="random" class="mainbtn" style="margin-top:10%">Next</button>
</div>
`);

event1Page
    .find('#random')
    .click(() => {
            event1Page.detach();
            event1passPage.appendTo("body")
    });

const factors1inPage = $(`
<div id="main">
<div class="head" style="font-size: 1.6rem">Bonus attribute!</div>
<div class="item">Is that a floating piece of DNA? You should engulf it, who knows what attributes it can give you.</div>
<div class="item" style="margin-top:5%">The science: Bacteria can take up environmental DNA in a process called “transformation”. This is one of several ways bacteria acquire new attributes to aid their survival.
</div>   
<button id="random" class="mainbtn" style="margin-top:10%">Choose the bonus attribute</button>
</div>
`);

event1passPage
    .find('#random')
    .click(() => {
        event1passPage.detach();
        factors1inPage.appendTo("body")
    });


const factors1Page = $(`
<div class="selectedfactors" id="selectedfactors">
        <button id="but" class="mainbtn1">Show Selected Attributes</button>
        <div id="factors" style="margin-left:8%"></div>
    </div>
<div id="main">
<div class="head" style="font-size: 1.6rem">Choose your bonus attribute</div>
<h3 class="item">Remaining attributes</h3>
<ul id="talents1" class="selectlist"></ul>
<button id="random" class="mainbtn" style="margin-top:10%">Go to Event 2</button>
</div>
`);

function difference(setA, setB) {
    let _difference = new Set(setA);
    for (let elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
}


factors1inPage
    .find('#random')
    .click(() => {
        factors1inPage.detach();
        factors1Page.appendTo("body");
        for (const i of difference(allfactors, factorselected)){
            const li = $(`<li class="grade0b" id= "${i}">${i}</li>`)
            factors1Page.find('#talents1').append(li);
            li.click(() => {
                if(li.hasClass("selected")){
                    li.removeClass("selected");
                    factorselected.delete(`${i}`)
                }else{
                    if(factorselected.size==3){
                        li.addClass('selected'); 
                        factorselected.add(`${i}`)
                    } else{var banner = $(".banner");
                    banner.addClass('visible');
                    banner.find('.banner-message').text('only one bonus attribute');}
                }
            })
        }
    });

factors1Page
    .find('#but')
    .click(() => {
    for (const i of  factorselected){
        const fa = $(`<div class="item">${i}</div>`);
        $('#factors').append(fa);
    }
    });

const event2Page = $(`
    <div class="selectedfactors" id="selectedfactors">
        <button id="but" class="mainbtn1">Show Selected Attributes</button>
        <div id="factors" style="margin-left:8%"></div>
    </div>
    <div id="main">
    <div class="head" style="font-size: 1.6rem">Event 2</div>
    <h3 class="item">Introduction</h3> 
    <div class="item">Antibiotics are drugs meant to specifically kill bacteria (you!). Attributes that confer resistance to antibiotics will definitely come in handy now!</div> 
    <h3 class="item" style="margin-top:10%">Detailed event and requirements to pass</h3>   
    <div class="item">Oh no! You made your human sick… how terrible. Your human went to see a doctor, and was instructed to take the antibiotic penicillin.</div> 
    <div class="item" style="margin-top:5%"> Required: resistance to penicillin or biofilm.</div>
    <button id="random" class="mainbtn" style="margin-top:10%">Outcome of Event 2</button>
    </div>
    `);

factors1Page
    .find('#random')
    .click(() => {
        if(factorselected.size==3){
            var banner = $(".banner");
            banner.addClass('visible');
            banner.find('.banner-message').text('select bonus attribute to proceed');
        }else{
        factors1Page.detach();
        event2Page.appendTo("body")}
    });

event2Page
    .find('#but')
    .click(() => {
    for (const i of  factorselected){
        const fa = $(`<div class="item">${i}</div>`);
        $('#factors').append(fa);
    }
    });

const event2passPage = $(`
    <div id="main">
    <div class="head" style="font-size: 1.6rem">Event 2 Passed!</div>
    <div class="item">The reproduction of the bacterial population was not inhibited in this event, and your numbers are growing!</div>   
    <h3 class="item" style="margin-top:10%">End notes of Event 2</h3> 
    <div class="item"> Antibiotics are useful drugs for treating bacterial infections. However, more bacterial strains resistant to multiple antibiotics are emerging, making infections harder to treat. This is a massive public health concern.</div>
    <h3 class="item" style="margin-top:10%">Current bacteria population: 100000000</h3>
    <button id="random" class="mainbtn" style="margin-top:10%">Next</button>
    </div>
    `);

const event2failPage = $(`
    <div id="main">
    <div class="head" style="font-size: 1.6rem">Event 2 Failed!</div>
    <div class="item">You suffered heavy losses due to penicillin! Your population is halved.</div>   
    <h3 class="item" style="margin-top:10%">End notes of Event 2</h3> 
    <div class="item"> Antibiotics are useful drugs for treating bacterial infections. However, more bacterial strains resistant to multiple antibiotics are emerging, making infections harder to treat. This is a massive public health concern.</div>
    <h3 class="item" style="margin-top:10%">Current bacteria population: 5000</h3>
    <button id="random" class="mainbtn" style="margin-top:10%">Next</button>
    </div>
    `);

event2Page
    .find('#random')
    .click(() => {
        if(factorselected.has("biofilm")==true){
        event2Page.detach();
        event2passPage.appendTo("body")
        }else{
        if(factorselected.has("resistance to penicillin")==true)
        {event2Page.detach();
        event2passPage.appendTo("body")}
        else{event2Page.detach();
        event2failPage.appendTo("body")}
        }
    })

const factors2inPage = $(`
    <div id="main">
    <div class="head" style="font-size: 1.6rem">Bonus event!</div>
    <div class="item">Who’s that? You’ve never seen this bacterium before. You decide to exchange DNA and you realised that you’ve gotten a new attribute!</div>
    <div class="item" style="margin-top:5%">The science: Bacteria can exchange genetic material through an appendage known as a “pilus”. This process is known as “conjugation”, sometimes called “bacterial sex”.</div>   
    <button id="random" class="mainbtn" style="margin-top:10%">Choose the bonus attribute</button>
    </div>
    `);

event2passPage
    .find('#random')
    .click(() => {
        event2passPage.detach();
        factors2inPage.appendTo("body")
    });

event2failPage
    .find('#random')
    .click(() => {
        event2failPage.detach();
        factors2inPage.appendTo("body")
    });

const factors2Page = $(`
    <div class="selectedfactors" id="selectedfactors">
        <button id="but" class="mainbtn1">Show Selected Attributes</button>
        <div id="factors" style="margin-left:8%"></div>
    </div>  
    <div id="main">
    <div class="head" style="font-size: 1.6rem">Choose your bonus attribute</div>
    <h3 class="item">Remaining attributes</h3>
    <ul id="talents1" class="selectlist"></ul>
    <button id="random" class="mainbtn" style="margin-top:10%">Go to Event 3</button>
    </div>
    `);

factors2inPage
    .find('#random')
    .click(() => {
        factors2inPage.detach();
        factors2Page.appendTo("body");
        for (const i of difference(allfactors, factorselected)){
            const li = $(`<li class="grade0b" id= "${i}">${i}</li>`)
            factors2Page.find('#talents1').append(li);
            li.click(() => {
                if(li.hasClass("selected")){
                    li.removeClass("selected");
                    factorselected.delete(`${i}`)
                }else{
                    if(factorselected.size==4){
                        li.addClass('selected'); 
                        factorselected.add(`${i}`)
                    } else{var banner = $(".banner");
                    banner.addClass('visible');
                    banner.find('.banner-message').text('only one bonus attribute');}
                }
            })
        }
    });

factors2Page
    .find('#but')
    .click(() => {
    for (const i of  factorselected){
        const fa = $(`<div class="item">${i}</div>`);
        $('#factors').append(fa);
    }
    });


const event3Page = $(`
    <div class="selectedfactors" id="selectedfactors">
        <button id="but" class="mainbtn1">Show Selected Attributes</button>
        <div id="factors" style="margin-left:8%"></div>
    </div>
    <div id="main">
    <div class="head" style="font-size: 1.6rem">Event 3</div>
    <h3 class="item">Introduction</h3> 
    <div class="item">It is not in bacteria’s benefit to kill their host. Killing their host or causing severe disease will limit the ability of bacteria to spread to new hosts, hampering their spread.</div> 
    <h3 class="item" style="margin-top:10%">Detailed event and requirements to pass</h3>   
    <div class="item">Your population is growing quickly, too quickly! Antibiotics and your human’s immune system couldn’t control your population. You risk killing your human.</div>
    <div class="item" style="margin-top:5%">Stop! What good will it be if you kill your human (home)?</div> 
    <div class="item" style="margin-top:5%"> Required: don't have alpha toxin and delta toxin</div>
    <button id="random" class="mainbtn" style="margin-top:10%">See final outcomes</button>
    </div>
    `);

factors2Page
.find('#random')
.click(() => {
    if(factorselected.size==4){
        var banner = $(".banner");
        banner.addClass('visible');
        banner.find('.banner-message').text('select bonus attribute to proceed');
    }else{
    factors2Page.detach();
    event3Page.appendTo("body")}
});

event3Page
    .find('#but')
    .click(() => {
    for (const i of  factorselected){
        const fa = $(`<div class="item">${i}</div>`);
        $('#factors').append(fa);
    }
    });

const final1Page = $(`
    <div id="main">
    <div class="head" style="font-size: 1.6rem">Final Outcomes</div>
    <div class="item">With both Alpha toxin and Delta toxin, oh no, You killed your human! You are now homeless. Bacterial population is 0.</div>   
    <button id="random" class="mainbtn" style="margin-top:10%">The End</button>
    </div>
    `);


const final2Page = $(`
    <div id="main">
    <div class="head" style="font-size: 1.6rem">Final Outcomes</div>
    <div class="item">Without both Alpha toxin and Delta toxin, your human lives! You can continue living here for a while. Your population grew again!</div>   
    <button id="random" class="mainbtn" style="margin-top:10%">The End</button>
    </div>
    `);



event3Page
    .find('#random')
    .click(() => {
        if(factorselected.has("Alpha toxin")==true && factorselected.has("Delta toxin")==true)
        {event3Page.detach();
        final1Page.appendTo("body")}
        else{event3Page.detach();
            final2Page.appendTo("body")}
    });

const endPage= $(`
<div id="main">
<div class="head" style="font-size: 1.6rem">End Tips</div>
<div class="item">It’s not in the bacteria’s best interest to cause disease or kill their host, they’re just struggling to survive and reproduce.</div>   
<video id="Video2" width="500" height="400" controls><source src="video/chw.mp4"  type="video/mp4"></video>
</div>
`);


final1Page
    .find('#random')
    .click(() => {
        final1Page.detach();
        endPage.appendTo("body")
    });

final2Page
    .find('#random')
    .click(() => {
        final2Page.detach();
        endPage.appendTo("body")
    });

const endoverPage = $(`
    <div id="main">
    <div class="head" style="font-size: 1.6rem">We are group8!</div>
    <h3 class="item">Game designed by: Haonan Zhang</h3>   
    <h3 class="item">Game developed by: Jinchun Zhang</h3>
    <h3 class="item">Videos presented by: Hou Wei Chook and Chenge Du</h3>   
    <h3 class="item">Videos cut and modified by: Weifan Wang</h3> 
    <h2 class="item" style="margin-top:5%">Thank you for your attention!</h3> 
    <button id="random" class="mainbtn" style="margin-top:10%">Replay!</button>
    </div>
    `);

var v2 = endPage.find("#Video2");
v2.bind('ended',function(){ 
        endPage.detach();
        endoverPage.appendTo("body")
    });


endoverPage
    .find('#random')
    .click(() => {
        factorselected.clear();
        talents2selected.clear();
        talents1selected.clear();
        talents3selected.clear();
        factorsPage.find("li").removeClass("selected");
        factors1Page.find("li").detach();
        factors2Page.find("li").detach();
        endoverPage.detach();
        backgroundPage.appendTo("body")
    });