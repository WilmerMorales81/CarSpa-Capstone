export const getAllOrders = () => {
    return fetch("http://localhost:8088/orders").then((res) => res.json())
}

export const updateOrder = (order) => {
    return fetch(`http://localhost:8088/orders/${order.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    })
}

export const assignOrder = (userOrder) => {
    return fetch("http://localhost:8088/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userOrder),
    })

} 

export const createOrder = (order) => {
    return fetch("http://localhost:8088/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }).then((res) => res.json())
  }

  export const deleteOrder = (orderId) => {
    return fetch(`http://localhost:8088/orders/${orderId}`, {
        method:"DELETE"
    });
  }

 