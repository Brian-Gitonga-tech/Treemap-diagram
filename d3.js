//fetch data
const url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"

const req = new XMLHttpRequest
req.open("GET", url, true)
req.send()
req.onload = () => {
    const json = JSON.parse(req.responseText)
//create a reference of the data retrived
    const data = json
    
    const w = 1200
    const h = 600
    const p = 60
    
    const hierarchy = d3.hierarchy(data, (node) => {
        return  node["children"]
    }).sum((node) => {
        return node["value"]
    }).sort((node1, node2) => {
        return node2 - node1
    })
     
    const movies = hierarchy.leaves()

    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h)
                  .attr("padding", p)
    const treeMap = d3.treemap()
                      .size([w, h])
        treeMap(hierarchy)
    let block = svg.selectAll("g")
                   .data(movies)
                   .enter()
                   .append("g")
                   .attr("transform", (d) => {return "translate(" + d["x0"] + ', ' + d["y0"] + ")"})
        block.append("rect")
             .attr("class", "tile")
             .attr("fill", (d) => {
                const category = (d["data"]["category"])
                if(category === "Action") {
                    return "rgb(76, 146, 195)"
                }else if(category === "Adventure") {
                    return "rgb(190, 210, 237)"
                }else if(category === "Comedy") {
                    return "rgb(255, 153, 62)"
                }else if(category === "Drama") {
                    return "rgb(255, 201, 147)"
                }else if(category === "Family") {
                    return "rgb(173, 229, 161)"
                }else if(category === "Animation") {
                    return "rgb(86, 179, 86)"
                }else {
                    return "rgb(222, 82, 83)"
                }
             })
             .attr("data-name", (d) => {
                const name = d["data"]["name"]
                return name
             })
             .attr("data-category", (d) => {
                const category = d["data"]["category"]
                return category
             })
             .attr("data-value", (d) => {
                const value = d["data"]["value"]
                return value
             })
             .attr("width", (d) => {
                return d["x1"] - d["x0"]
             })
             .attr("height", (d) => {
                return d["y1"] - d["y0"]
             })
        block.append("text")
             .text((d) => {
                return d["data"]["name"]
             })
             .attr("x", 5)
             .attr("y", 20)


}
