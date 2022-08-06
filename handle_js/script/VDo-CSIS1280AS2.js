// declare variable
const lastName = document.getElementById('lastname')
const firstName = document.getElementById('firstname')
const groupSize = document.getElementById('GroupSize')
const discRate = document.getElementById('discRate')
const addMember = document.getElementById('addMember')
const deleteMember = document.getElementById('deleteMember')
const sortMember = document.getElementById('sortMember')
const members = document.getElementById('members')
const bee = document.getElementById('bee')
const advice = document.getElementById('advice')

function CheckForGroupMemberInput() {
  try {
    if (firstName.value.trim() == "" || lastName.value.trim() == "") {
      throw "Please first enter a group member’s name"
    }
  }
  catch(err) {
    alert(err)
		return false
  }
	return true
}

function CheckForGroupSizeInput() {
  try {
    if (groupSize.value.trim() == "") throw "Please group size enter a group member's size"
    if(isNaN(Number(groupSize.value))) throw "Please group size enter is a number";
  }
  catch(err) {
    alert(err)	
		return false
  }
	return true
}

function CalcGroupDiscount() {
	if (CheckForGroupSizeInput()) {
		discRate.value = null	
		let resultDis = 0
	
		switch (true) {
			case groupSize.value >= 5 && groupSize.value <= 10:
				// 5-10 people: 10% discount per group member
				resultDis = 5
				break;
			case groupSize.value >= 11 && groupSize.value <= 24: 
				// 11-24 people: 20% discount per group member
				resultDis = 10
				break;
			case groupSize.value > 25:
				// 25+ people: 25% discount per group member
				resultDis = 12.5
				break;
			default:
				resultDis = 50
		}
	
		discRate.value = resultDis.toFixed(2);
	}
}

function AddGroupMember() {
	if (CheckForGroupMemberInput()) {
		let option = document.createElement("option");
		option.value = `${lastName.value}, ${firstName.value}`;
		option.text = `${lastName.value}, ${firstName.value}`;
		members.add(option);

		// remove value name to input
		lastName.value = ''
		firstName.value = ''
	}
}

function RemoveGroupMember() {
	let value = members.value
	if (value) {
		members.remove(members.selectedIndex);  
	} else {
		alert('There are no group members to delete!')
	}
}

function SortGroupMembers() {
	const arrSort = []
	for (var option of members.options) {
		arrSort.push(option.value)
	}
	arrSort.sort()

	// reset arr sort
	members.options.length = 0;

	// display arr sorted
	for (var i=0; i < arrSort.length; i++) {
		let optionAdd = document.createElement("option");
		optionAdd.value = arrSort[i]
		optionAdd.text = arrSort[i]
		members.add(optionAdd)
	}
}

function FlyingBee() {
	bee.style.visibility = 'visible'
	let beePositon = 0
	setInterval(function(){ 
		if (beePositon < 60) {
			bee.style.left = beePositon + "vw"; 
			beePositon++; 
		} else advice.style.display = "block"
	},20);
}

groupSize.addEventListener('keyup', CalcGroupDiscount)
addMember.addEventListener('click', AddGroupMember)
deleteMember.addEventListener('click', RemoveGroupMember)
sortMember.addEventListener('click', SortGroupMembers)

window.addEventListener('load', FlyingBee);