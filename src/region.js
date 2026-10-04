const regionMemory={};let previousRegion='wuling';
const regionFields=['ore','blue','crystal','copper','solid','gas','threshold','transport','transportAmount','power','lowPower','highPower','waste'];
const regionChecks=['current','node','useMidPower','useLowPower','useHighPower'];
function regionSwitch(){
 regionMemory[previousRegion]={values:Object.fromEntries(regionFields.map(k=>[k,$(k).value])),checks:Object.fromEntries(regionChecks.map(k=>[k,$(k).checked]))};
 const valley=$('region').value==='valley';previousRegion=$('region').value;
 if(worker){worker.terminate();worker=null;}
 for(const k of Object.keys(modeSnapshots))delete modeSnapshots[k];last=null;if(typeof clearUnifiedResult==='function')clearUnifiedResult();$('status').textContent='';
 $('transport').innerHTML=valley?'<option value="none">未开放</option>':'<option value="none">不运输</option><option value="powder">致密原石粉末</option><option value="blue">蓝铁类（矿／粉末等价）</option>';
 const old=regionMemory[previousRegion];
 if(old){for(const[k,v]of Object.entries(old.values))$(k).value=v;for(const[k,v]of Object.entries(old.checks))$(k).checked=v;}
 else{for(const[k,v]of Object.entries(valley?{ore:560,blue:1080,crystal:240,copper:0,solid:0,gas:0}:{ore:540,blue:120,crystal:0,copper:510,solid:360,gas:150}))$(k).value=v;$('threshold').value=valley?119542:102960;$('transport').value=valley?'none':'powder';$('transportAmount').value=valley?0:1500;}
 if(valley){$('node').checked=false;$('waste').value=0;$('transport').value='none';$('transportAmount').value=0;}
 $('wasteControls').hidden=valley;$('highPowerControls').hidden=!valley;$('transport').disabled=valley;$('transportAmount').disabled=valley;
 $('regionNote').textContent=valley?'四号谷地计算暂未开放。默认无赤铜、息壤及息壤气；不支持各类水相关配方。':'武陵产线计算已开放；当前版本紫晶矿为0。';
 for(const k of ['calculateTop','stage1Calculate','stage2Calculate'])$(k).disabled=valley;
 $('highPower').disabled=!$('useHighPower').checked;state();selectSnapshot();render();
}
$('region').onchange=regionSwitch;
$('useHighPower').onchange=()=>{$('highPower').disabled=!$('useHighPower').checked;};
