import { prisma } from "@/lib/prisma"

export async function getOrCreateCart(userId: string) {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })
  }

  return cart
}

export async function addToCart(userId: string, productId: string, size: string, color: string, quantity = 1) {
  const cart = await getOrCreateCart(userId)

  // Check if item already exists in cart
  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId,
      size,
      color,
    },
  })

  if (existingItem) {
    // Update quantity
    return await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    })
  } else {
    // Create new cart item
    return await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        size,
        color,
        quantity,
      },
    })
  }
}

export async function updateCartItem(itemId: string, quantity: number) {
  if (quantity <= 0) {
    return await prisma.cartItem.delete({
      where: { id: itemId },
    })
  }

  return await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  })
}

export async function removeFromCart(itemId: string) {
  return await prisma.cartItem.delete({
    where: { id: itemId },
  })
}

export async function clearCart(userId: string) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  })

  if (cart) {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    })
  }
}

export function calculateCartTotal(items: any[]) {
  return items.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)
}
