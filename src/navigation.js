$('craftCollapseAll').onclick=()=>document.querySelectorAll('#craftSwitches details').forEach(d=>d.open=false);
$('craftExpandAll').onclick=()=>document.querySelectorAll('#craftSwitches details').forEach(d=>d.open=true);
$('jumpNav').onclick=e=>{const button=e.target.closest('button[data-jump]');if(!button)return;let id=button.dataset.jump;if(id==='planning')id=active===3?'customPanel':active===2?'unifiedPanel':'calculateTop';const target=$(id);if(!target)return;if(id==='recipeLibrary')$('recipeLibraryDetails').open=true;target.scrollIntoView({behavior:'smooth',block:'start'});};
if(window.innerWidth<700)$('jumpNav').open=false;
// Open the collapsed catalogue only when explicitly requested through its link.
document.querySelectorAll('a[href="#recipeLibrary"]').forEach(a=>a.onclick=e=>{e.preventDefault();$('recipeLibraryDetails').open=true;$('recipeLibrary').scrollIntoView({behavior:'smooth',block:'start'});});
// Private questionnaire shortcuts stay visible on the right, independently of scroll.
$('questionJumpNav')?.remove();const questionNav=document.createElement('nav');questionNav.id='questionJumpNav';questionNav.className='question-jump-nav';questionNav.setAttribute('aria-label','私人定制问卷问题导航');questionNav.innerHTML='<span>问题</span>'+[1,2,3,4,5].map(n=>`<button type="button" data-question-jump="${n}" aria-label="跳转到第${n}个问题">${n}</button>`).join('');document.body.appendChild(questionNav);
function updateQuestionNav(){questionNav.hidden=active!==3;for(const button of questionNav.querySelectorAll('button')){const selected=+button.dataset.questionJump===customStep;button.classList.toggle('current',selected);if(selected)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');}}
questionNav.onclick=e=>{const button=e.target.closest('button[data-question-jump]');if(!button)return;customShow(+button.dataset.questionJump);};
const questionNavBaseShow=customShow;customShow=function(step){questionNavBaseShow(step);updateQuestionNav();};
const questionNavBaseState=unifiedState;unifiedState=function(){questionNavBaseState();updateQuestionNav();};
updateQuestionNav();
