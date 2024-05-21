(function(){
	var small = "(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v[.]?|via|vs[.]?)";
	var punct = "([!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)";
  
	this.titleCaps = function(title){
		var parts = [], split = /[:.;?!] |(?: |^)["Ò]/g, index = 0;
		
		while (true) {
			var m = split.exec(title);

			parts.push( title.substring(index, m ? m.index : title.length)
				.replace(/\b([A-Za-z][a-z.'Õ]*)\b/g, function(all){
					return /[A-Za-z]\.[A-Za-z]/.test(all) ? all : upper(all);
				})
				.replace(RegExp("\\b" + small + "\\b", "ig"), lower)
				.replace(RegExp("^" + punct + small + "\\b", "ig"), function(all, punct, word){
					return punct + upper(word);
				})
				.replace(RegExp("\\b" + small + punct + "$", "ig"), upper));
			
			index = split.lastIndex;
			
			if ( m ) parts.push( m[0] );
			else break;
		}
		
		return parts.join("").replace(/ V(s?)\. /ig, " v$1. ")
			.replace(/(['Õ])S\b/ig, "$1s")
			.replace(/\b(AT&T|Q&A)\b/ig, function(all){
				return all.toUpperCase();
			});
	};
    
	function lower(word){
		return word.toLowerCase();
	}
    
	function upper(word){
	  return word.substr(0,1).toUpperCase() + word.substr(1);
	}
})();

const staticInfo = [

    {
        title: titleCaps('time since we started talking on hinge'),
        type: 'countup',
        time: new Date('2022-04-20T02:45:00.000-04:00')
    },
    {
        title: titleCaps('time since we started texting'),
        type: 'countup',
        time: new Date('2022-04-24T11:39:00.000-04:00')
    },
    {
        title: titleCaps('time since our first date'),
        type: 'countup',
        time: new Date('2022-05-01T12:00:00.000-04:00')
    },
    {
        title: titleCaps('time since we were officially dating'), //between 5/26 1:11PM and 5/27 5:00PM
        type: 'countup',
        time: new Date('2022-05-26T22:00:00.000-04:00')
    },
    {
        title: titleCaps('time since we first went to kam pei'),
        type: 'countup',
        time: new Date('2022-06-24T13:20:00.000-04:00')
    },
    {
        title: titleCaps('time since we first went to texas roadhouse'),
        type: 'countup',
        time: new Date('2022-08-18T19:34:00.000-04:00')
    },
    {
        title: titleCaps('time since i pranked you by making you spill water from my parents fridge on the floor'),
        type: 'countup',
        time: new Date('2022-05-11T19:30:00.000-04:00')
    },
    {
        title: titleCaps('time since we first had sex'),
        type: 'countup',
        time: new Date('2022-05-20T09:00:00.000-04:00')
    },
    {
        title: titleCaps('time since we first played Azul'),
        type: 'countup',
        time: new Date('2022-06-10T14:00:00.000-04:00')
    },
    {
        title: titleCaps('time since we first played Catan'),
        type: 'countup',
        time: new Date('2022-08-10T22:00:00.000-04:00')
    },
    {
        title: titleCaps('time since we first played DnD'),
        type: 'countup',
        time: new Date('2022-06-17T12:00:00.000-04:00')
    }

];

function getYearMonthDayDifference(startDate, endDate) {
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();
    
    if (days < 0) {
        months--;
        let previousMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
        days += previousMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

function breakDate(date1, date2) {

    let { years, months, days } = getYearMonthDayDifference(date1, date2);

    // Calculate the remaining hours, minutes, and seconds
    //let remainingTimeStart = new Date(date1.getFullYear() + years, date1.getMonth() + months, date1.getDate() + days, date1.getHours(), date1.getMinutes(), date1.getSeconds());
    let remainingTimeStart = new Date(date1);
    remainingTimeStart.setFullYear(date1.getFullYear() + years);
    remainingTimeStart.setMonth(date1.getMonth() + months);
    remainingTimeStart.setDate(date1.getDate() + days);
    let diffInMillis = date2 - remainingTimeStart;

    let seconds = Math.floor(diffInMillis / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    seconds = seconds % 60;

    if(hours < 0) hours = 24+hours;
    if(minutes < 0) minutes = 60+minutes;
    if(seconds < 0) seconds = 60+seconds;

    return {years, months, days, hours, minutes, seconds}
}

function modifyString(str) {
    // Split the string by ':'
    let parts = str.split(':');
    
    // Check if there are more than two ':'
    if (parts.length > 2) {
      // Join the first two parts with ':' to restore the initial part of the string
      let initialPart = parts.slice(0, 2).join(':');
      
      // Join the remaining parts with ':' to get the rest of the string
      let remainingPart = parts.slice(2).join(':');
      
      // Find the index of the last space in the remaining part
      let lastSpaceIndex = remainingPart.lastIndexOf(' ');
      
      // If there's a space, remove everything up to that space
      if (lastSpaceIndex !== -1) {
        remainingPart = remainingPart.slice(lastSpaceIndex);
      } else {
        // If there's no space, it means there's nothing to remove in the remaining part
        remainingPart = '';
      }
      
      // Combine the initial part and the modified remaining part
      return initialPart + remainingPart;
    }
    
    // If there are two or fewer ':', return the original string
    return str;
  }

function add() {
  const titleInp = document.getElementById('titleInp');
  const dateInp = document.getElementById('dateInp');
  const timeInp = document.getElementById('timeInp');
  
    let customInfo = getItem('customInfo') || '';
    storeItem('customInfo',
      customInfo + 
      (customInfo.length==0 ? '':'␝') + 
      `${titleInp.value}␞${new Date(dateInp.value + ' ' + timeInp.value).toString()}`
    );
  clearInterval(intervalID);
  const divs = document.getElementById('divs');
  for(let i = divs.children.length-1; i >= 0; i--) {
    print('del');
    divs.removeChild(divs.children[i]);
  }
  setup();
}

let intervalID = null;

function setup() {
    
    //storeItem('customInfo', 'Test Info 1␞June 18 2026 11:59PM EST␝Test Info 2␞1/1/2100');
    let keep = '';
    let customInfo = getItem('customInfo') || '';

    let info = staticInfo.slice();
  
    if(customInfo.length > 0) {
      for(let custom of customInfo.split('␝')) {
        let [title, time] = custom.split('␞');
        let d = new Date(time);
        if(new Date() - d < 0) {
          keep += (keep.length==0 ? '':'␝') + custom;
        }
        info.push({
          title: titleCaps(title),
          type: 'countdown',
          time: new Date(time)
        });
      }
    }
    storeItem('customInfo', keep);
  
    info.sort( (a,b) => {
      if(a.type == b.type)
          return a.time - b.time;
      else
          return a.type == 'countup' ? 1 : -1;
    });
  
    const divs = document.getElementById('divs')
    let allUpdates = [];
  
    for(let {title, type, time} of info) {
        const panel = document.createElement('div');
        panel.classList.add('item');
        const panelTitle = document.createElement('h2');
        const panelSubTitle = document.createElement('h4');
        const panelBody = document.createElement('p');
        const panelIcon = document.createElement('img');
        panel.appendChild(panelTitle);
        panel.appendChild(panelSubTitle);
        panel.appendChild(panelBody);
        panel.appendChild(panelIcon);
      
        panelIcon.src = "./trash.png";
        panelIcon.classList.add('trash-icon');

        panelTitle.innerHTML = title;
        let timeString = modifyString(time.toLocaleTimeString('en-us'));
        panelSubTitle.innerHTML = `(${time.toLocaleDateString('en-us')} at ${timeString})`;
        
        let updateBody;
        if(type == 'countup') {
            updateBody = () => {
                let {years, months, days, hours, minutes, seconds} = breakDate(time, new Date());
                panelBody.innerHTML = `${years} year${years == 1 ? '':'s'}, ${months} month${months == 1 ? '':'s'}, ${days} day${days == 1 ? '':'s'}, ${hours} hour${hours == 1 ? '':'s'}, ${minutes} minute${minutes == 1 ? '':'s'}, ${seconds} second${seconds == 1 ? '':'s'}`;
            }
        } else {
          panel.classList.add('removable');
            updateBody = () => {
                let {years, months, days, hours, minutes, seconds} = breakDate(new Date(), time);
                panelBody.innerHTML = `${years} year${years == 1 ? '':'s'}, ${months} month${months == 1 ? '':'s'}, ${days} day${days == 1 ? '':'s'}, ${hours} hour${hours == 1 ? '':'s'}, ${minutes} minute${minutes == 1 ? '':'s'}, ${seconds} second${seconds == 1 ? '':'s'}`;
            }
        }
        allUpdates.push(updateBody);
        updateBody();
        divs.appendChild(panel);
    }

    intervalID = setInterval(() => allUpdates.forEach(fn => fn()), 250);
  
    const trashIcons = document.querySelectorAll('.trash-icon');
    
    trashIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const parentDiv = this.parentElement;
            parentDiv.parentElement.removeChild(parentDiv);
            let keep = '';
            if(customInfo.length > 0) {
              for(let custom of customInfo.split('␝')) {
                let [title, time] = custom.split('␞');
                let d = new Date(time);
                if(parentDiv.children[0].innerHTML != titleCaps(title)) {
                  keep += (keep.length==0 ? '':'␝') + custom;
                }
              }
            }
            storeItem('customInfo', keep);
        });
    });
}
