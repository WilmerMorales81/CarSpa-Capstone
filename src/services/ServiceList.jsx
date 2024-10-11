export const getInterior = () => {
    return fetch("http://localhost:8088/orders").then((res) => res.json())
}

export const getAllOrders = () => {
    return fetch("http://localhost:8088/orders").then((res) => res.json())
}

export const getAllInteriorServices = () => {
   return fetch(`http://localhost:8088/interior`).then((res) => res.json())
}

export const getAllExteriorServices = () => {
    return fetch(`http://localhost:8088/exterior`).then((res) => res.json())
 }