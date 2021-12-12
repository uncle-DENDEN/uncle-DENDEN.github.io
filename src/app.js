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
        <div class="item">Somehow, you have just infected a human. You need to make some smart choices on behalf of your fellow bacteria to survive and thrive within this treacherous environment. As the leader of the bacteria population, we need you to make the right choice to help us to survive and grow in the treacherous environment around. You can select three attributes that will either help you survive, or will spell your doom.</div> 
        <div class="item">Within your human, you will face three challenging events. Your success or failure depends on your choice of attributes. If you pass an event with the appropriate attributes, your population will be squared (population)^2. Otherwise, your population will be halved. Good luck! </div>        
        <button id="random" class="mainbtn">Next</button>
    </div>
    `);
indexPage
    .find('#restart')
    .click(() => {
        indexPage.detach();
        backgroundPage.appendTo("body")
    });
const factorsPage = $(`
    <div id="main">
        <div class="head" style="font-size: 1.6rem">Choose your attributes</div>
        <h3 class="item">Choose one from Category1</h3>
        <ul id="talents1" class="selectlist">
            <li class="grade0b" id="penicillin">resistance to penicillin</li>
            <div id="p_function"></div>
            <li class="grade0b" id="oxacillin">resistance to oxacillin</li>
            <div id="o_function"></div>
        </ul>
        <h3 class="item">Choose one from Category2</h3>
        <ul id="talents2" class="selectlist">
            <li class="grade0b" id="biofilm">biofilm</li>
            <div id="bio_function"></div>
            <li class="grade0b" id="β">β toxin</li>
            <div id="β_function"></div>
        </ul>
        <h3 class="item">Choose one from Category3</h3>
        <ul id="talents3" class="selectlist">
            <li class="grade0b" id="α">α toxin</li>
            <div id="α_function"></div>
            <li class="grade0b" id="δ">δ toxin</li>
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
allfactors.add("β toxin");
allfactors.add("α toxin");
allfactors.add("δ toxin");
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
    $("#p_function").show.css({
        left:p.left-15,
        top:p.top+30
    }).html(<p class="item">Resistance to antibiotics penicillin</p>);
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
β.click(() => {
    if(β.hasClass('selected')) {
        β.removeClass('selected');
        talents2selected.delete("β toxin");
        factorselected.delete("β toxin")
    } else{
        if(talents2selected.size<1){
            β.addClass('selected'); 
            talents2selected.add("β toxin");
            factorselected.add("β toxin")
        } else{var banner = $(".banner");
        banner.addClass('visible');
        banner.find('.banner-message').text('Choose one attribute per category!');}
    }
});
α.click(() => {
    if(α.hasClass('selected')) {
        α.removeClass('selected');
        talents3selected.delete("α toxin");
        factorselected.delete("α toxin")
    } else{
        if(talents3selected.size<1){
            α.addClass('selected'); 
            talents3selected.add("α toxin");
            factorselected.add("α toxin")
        } else{var banner = $(".banner");
        banner.addClass('visible');
        banner.find('.banner-message').text('Choose one attribute per category!');}
    }
});
δ.click(() => {
    if(δ.hasClass('selected')) {
        δ.removeClass('selected');
        talents3selected.delete("δ toxin");
        factorselected.delete("δ toxin")
    } else{
        if(talents3selected.size<1){
            δ.addClass('selected'); 
            talents3selected.add("δ toxin");
            factorselected.add("δ toxin")
        } else{var banner = $(".banner");
        banner.addClass('visible');
        banner.find('.banner-message').text('Choose one attribute per category!');}
    }
});


const startPage = $(`
    <div id="main">
        <div class="head" style="font-size: 1.6rem">Initial Settings</div>
        <div class="item" style="margin-top:10%">Initial bacterial population: 100</div> 
        <div class="item" style="margin-top:10%">Pass the event: bacteria population^2</div>   
        <div class="item" style="margin-top:10%">Failed to pass the event: bacteria population/2</div>      
        <button id="random" class="mainbtn" style="margin-top:10%">Go to Event1</button>
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

const event1Page = $(`
<div id="main">
<div class="head" style="font-size: 1.6rem">Event1</div>
<h3 class="item">Introduction</h3> 
<div class="item">Bacteria need the ability to escape from the first defence of human body, immune system.</div> 
<h3 class="item" style="margin-top:10%">Detailed event and requirements to pass</h3>   
<div class="item">You are welcomed by your human’s immune cells. Wait, this doesn’t seem like a warm welcome… they’re trying to kill you!</div> 
<div class="item" style="margin-top:5%"> Biofilm or β toxin is required to get through the event. Biofilm protects bacteria from the attack of immune cells while
Beta toxin kills immune cells, disrupting immune responses against you!</div>
<button id="random" class="mainbtn" style="margin-top:10%">Outcome of Event1</button>
</div>
`);

startPage
    .find('#random')
    .click(() => {
        startPage.detach();
        event1Page.appendTo("body")
    });

const event1failPage = $(`
<div id="main">
<div class="head" style="font-size: 1.6rem">Event1 Failed</div>
<div class="item">The reproduction of the bacteria population was inhibited in this event. Bacteria population is divided by two.</div>    
<h3 class="item">End notes of event1</h3> 
<div class="item" style="margin-top:5%"> immune cells will find and kill most of the invading bacteria, only a small precise of bacteria with special resistance can survive. </div>
<h3 class="item" style="margin-top:10%">Current bacteria population: 50</h3>
<button id="random" class="mainbtn" style="margin-top:10%">Next</button>
</div>
`);

const event1passPage = $(`
<div id="main">
<div class="head" style="font-size: 1.6rem">Event1 Passed!</div>
<div class="item">The reproduction of the bacterial population was not inhibited in this event, and your numbers are growing!</div>   
<h3 class="item" style="margin-top:10%">End notes of event1</h3> 
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
<div class="head" style="font-size: 1.6rem">Transformation Event</div>
<div class="item">Is that a floating piece of DNA? You should engulf it, who knows what attributes it can give you.</div>
<div class="item">The science: Bacteria can engulf DNA from the environment in a process known as “transformation”. Bacterial cells can express the genetic information encoded within the engulfed DNA. This one of many ways bacteria can acquire new attributes to aid their survival.
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
<div id="main">
<div class="head" style="font-size: 1.6rem">Choose your bonus attribute</div>
<h3 class="item">Remaining attributes</h3>
<ul id="talents1" class="selectlist"></ul>
<button id="random" class="mainbtn" style="margin-top:10%">Go to Event2</button>
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

const event2Page = $(`
    <div id="main">
    <div class="head" style="font-size: 1.6rem">Event2</div>
    <h3 class="item">Introduction</h3> 
    <div class="item">Antibiotics are drugs meant to specifically kill bacteria (you!). Attributes that confer resistance to antibiotics will definitely come in handy now!</div> 
    <h3 class="item" style="margin-top:10%">Detailed event and requirements to pass</h3>   
    <div class="item">Oh no! You made your human sick… how terrible. Your human went to see a doctor, and was instructed to take the antibiotic penicillin.</div> 
    <div class="item" style="margin-top:5%"> Required: resistance to penicillin or biofilm.</div>
    <div class="item" style="margin-top:5%">Oh no! You made your human sick… how terrible. Your human went to see a doctor, and was instructed to take the antibiotic oxacillin.</div> 
    <div class="item" style="margin-top:5%"> Required: resistance to oxacillin or biofilm.</div>
    <div class="item" style="margin-top:5%"> Biofilm protect bacteria from antibiotics.Antibiotics cannot kill the bacteria with the resistance.</div>
    <button id="random" class="mainbtn" style="margin-top:10%">Outcome of Event2</button>
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

const event2passPage = $(`
    <div id="main">
    <div class="head" style="font-size: 1.6rem">Event2 Passed!</div>
    <div class="item">The reproduction of the bacterial population was not inhibited in this event, and your numbers are growing!</div>   
    <h3 class="item" style="margin-top:10%">End notes of event2</h3> 
    <div class="item"> Antibiotics are useful drugs for treating bacterial infections. However, more bacterial strains resistant to multiple antibiotics are emerging, making infections harder to treat. This is a massive public health concern.</div>
    <h3 class="item" style="margin-top:10%">Current bacteria population: 100000000</h3>
    <button id="random" class="mainbtn" style="margin-top:10%">Next</button>
    </div>
    `);

const event2failPage = $(`
    <div id="main">
    <div class="head" style="font-size: 1.6rem">Event2 Failed!</div>
    <div class="item">You suffered heavy losses due to antibiotics! Your population is halved.</div>   
    <h3 class="item" style="margin-top:10%">End notes of event2</h3> 
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
        if(factorselected.has("resistance to penicillin")==true && factorselected.has("resistance to oxacillin")==true)
        {event2Page.detach();
        event2passPage.appendTo("body")}
        else{event2Page.detach();
        event2failPage.appendTo("body")}
        }
    })

const factors2inPage = $(`
    <div id="main">
    <div class="head" style="font-size: 1.6rem">Conjugation Event</div>
    <div class="item">Who’s that? You’ve never seen this bacterium before. You decide to exchange DNA and you realised that you’ve gotten a new attribute!</div>
    <div class="item">The science: Bacteria can exchange genetic material through an appendage known as a “pilum”. This process is known as “conjugation”, sometimes called “bacterial sex”.</div>   
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
    <div id="main">
    <div class="head" style="font-size: 1.6rem">Choose your bonus attribute</div>
    <h3 class="item">Remaining attributes</h3>
    <ul id="talents1" class="selectlist"></ul>
    <button id="random" class="mainbtn" style="margin-top:10%">Go to Event3</button>
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

const event3Page = $(`
    <div id="main">
    <div class="head" style="font-size: 1.6rem">Event3</div>
    <h3 class="item">Introduction</h3> 
    <div class="item"It is not in bacteria’s benefit to kill their host. Killing their host or causing severe disease will limit the ability of bacteria to spread to new hosts, hampering their spread.</div> 
    <h3 class="item" style="margin-top:10%">Detailed event and requirements to pass</h3>   
    <div class="item">Your population is growing quickly, too quickly! Antibiotics and your human’s immune system couldn’t control your population. You risk killing your human. Stop! What good will it be if you kill your human (home)? Run! Find a new human such that some part of you will remain in this world.</div> 
    <div class="item" style="margin-top:5%"> Required: don't have alpha toxin and delta toxin at the same time, α toxin and δ toxin disrupt cellular membranes and kill the host cells..</div>
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

const final1Page = $(`
    <div id="main">
    <div class="head" style="font-size: 1.6rem">Final Outcomes</div>
    <div class="item">With both α toxin and δ toxin, oh no, You killed your human! You are now homeless. Bacterial population is 0</div>   
    <button id="random" class="mainbtn" style="margin-top:10%">The End</button>
    </div>
    `);


const final2Page = $(`
    <div id="main">
    <div class="head" style="font-size: 1.6rem">Final Outcomes</div>
    <div class="item">Without both α toxin and δ toxin, your human lives! You can continue living here for a while. Your population grew again!</div>   
    <button id="random" class="mainbtn" style="margin-top:10%">The End</button>
    </div>
    `);



event3Page
    .find('#random')
    .click(() => {
        if(factorselected.has("α toxin")==true && factorselected.has("δ toxin")==true)
        {event3Page.detach();
        final1Page.appendTo("body")}
        else{event3Page.detach();
            final2Page.appendTo("body")}
    });

const endPage= $(`
<div id="main">
<div class="head" style="font-size: 1.6rem">End Tips</div>
<div class="item">It’s not in the bacteria’s best interest to cause disease or kill their host, they’re just struggling to survive and reproduce.</div>   
<button id="random" class="mainbtn" style="margin-top:10%">Replay!</button>
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


endPage
    .find('#random')
    .click(() => {
        factorselected.clear();
        talents2selected.clear();
        talents1selected.clear();
        talents3selected.clear();
        factorsPage.find("li").removeClass("selected");
        factors1Page.find("li").detach();
        factors2Page.find("li").detach();
        endPage.detach();
        backgroundPage.appendTo("body")
    });