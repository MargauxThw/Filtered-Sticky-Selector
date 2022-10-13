figma.showUI(
	__html__, {
	width: 350,
	height: 420,
	title: "Filtered Sticky Selector"
},
)

const colors = [{
	r: 1,
	g: 0.8509804010391235,
	b: 0.4000000059604645,
	name: "yellow"
},
{
	r: 0.5215686559677124,
	g: 0.8784313797950745,
	b: 0.6392157077789307,
	name: "green"
},
{
	r: 0.4588235318660736,
	g: 0.843137264251709,
	b: 0.9411764740943909,
	name: "teal"
},
{
	r: 0.686274528503418,
	g: 0.7372549176216125,
	b: 0.8117647171020508,
	name: "gray"
},
{
	r: 1,
	g: 0.686274528503418,
	b: 0.6392157077789307,
	name: "red"
},
{
	r: 1,
	g: 0.7686274647712708,
	b: 0.43921568989753723,
	name: "orange"
},
{
	r: 0.501960813999176,
	g: 0.7921568751335144,
	b: 1,
	name: "blue"
},
{
	r: 0.8509804010391235,
	g: 0.7215686440467834,
	b: 1,
	name: "violet"
},
{
	r: 1,
	g: 0.7411764860153198,
	b: 0.9490196108818054,
	name: "pink"
},
{
	r: 0.9019607901573181,
	g: 0.9019607901573181,
	b: 0.9019607901573181,
	name: "light-gray"
}

]

function checkMatch(filters, str) {
	// Check that the text in Sticky meets filter requirements
	for (let i = 0; i < filters.length; i++) {
		switch (filters[i].filter) {
			case "e":
				if (filters[i].input !== str) {
					return false
				}
				break
			case "dne":
				if (filters[i].input === str) {
					return false
				}
				break
			case "bw":
				if (!str.startsWith(filters[i].input)) {
					return false
				}
				break
			case "dnbw":
				if (str.startsWith(filters[i].input)) {
					return false
				}
				break
			case "ew":
				if (!str.endsWith(filters[i].input)) {
					return false
				}
				break
			case "dnew":
				if (str.endsWith(filters[i].input)) {
					return false
				}
				break
			case "c":
				if (!str.includes(filters[i].input)) {
					return false
				}
				break
			case "dnc":
				if (str.includes(filters[i].input)) {
					return false
				}
				break
		}
	}

	return true

}

function checkColor(color, fills) {
	// Check that Sticky is correct color
	if (color !== "all") {
		console.log(color)
		for (let i = 0; i < colors.length; i++) {
			if (colors[i].name === color) {
				if (fills.color.r != colors[i].r) {
					return false
				}
				if (fills.color.g != colors[i].g) {
					return false
				}
				if (fills.color.b != colors[i].b) {
					return false
				}
			}
		}
	}

	return true
}


figma.ui.onmessage = msg => {

	var children

	if (msg.type === 'apply-all') {
		children = figma.currentPage.children
	} else if (msg.type === 'apply-selected') {
		children = figma.currentPage.selection
	}

	const nodes = []

	for (let i = 0; i < children.length; i++) {
		if (children[i].type === "STICKY") {
			if (checkColor(msg.color, children[i].fills[0])) {
				if (checkMatch(msg.filters, children[i].text.characters)) {
					nodes.push(children[i])

				}
			}
		}
	}

	figma.currentPage.selection = nodes
	figma.viewport.scrollAndZoomIntoView(nodes)


};