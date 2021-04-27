let spacePlane = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . c b c b . . . . . . . . . .
    . c b c b f f f 9 9 . . . . . .
    4 2 a a a a a a a a f f f f . .
    2 4 a a a a a a a a a a a a f .
    . 9 9 9 9 9 f f f f f f f . . .
    . f f f f f . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
spacePlane.setStayInScreen(true)
info.setLife(3)
controller.moveSprite(spacePlane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let dart = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . 6 9 9 . . . .
        . . . . 6 . 9 6 9 6 6 6 9 6 . .
        . . . . . . . . 6 9 9 9 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, spacePlane, 200, 0)
})
game.onUpdateInterval(500, function on_update_interval() {
    let bogey = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . 3 3 . 3 . 3 . 3 3 . . . .
        . . 3 . . 3 . 3 . 3 . . 3 . . .
        . 3 . . . . 3 . 3 . . . . 3 . .
        . . . . . . . 3 . . . 7 . . . .
        . . . 1 1 . 5 5 5 . 7 4 2 . . .
        . . . . . 1 5 f 5 7 4 2 4 2 . .
        . . . . . . 1 5 5 5 5 4 2 4 2 .
        . . . . . 1 5 f 5 7 7 2 4 2 . .
        . . . 1 1 . 5 5 5 . 7 4 2 . . .
        . . . . . . . 3 . . . 7 . . . .
        . 3 . . . . 3 . 3 . . . . 3 . .
        . . 3 . . 3 . 3 . 3 . . 3 . . .
        . . . 3 3 . 3 . 3 . 3 3 . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Enemy)
    bogey.setVelocity(-50, 0)
    bogey.left = scene.screenWidth()
    bogey.y = randint(0, scene.screenHeight())
    bogey.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_bullet_overlap(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy()
    sprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
