spacePlane = sprites.create(img("""
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
"""),SpriteKind.player)

spacePlane.set_stay_in_screen(True)

info.set_life(3)

controller.move_sprite(spacePlane, 200, 200)

def on_a_pressed():
    dart = sprites.create_projectile_from_sprite(img("""
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
    """),spacePlane,200,0)
controller.A.on_event(ControllerButtonEvent.PRESSED,on_a_pressed)

def on_update_interval():
    bogey = sprites.create(img("""
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
    """),SpriteKind.enemy)
    bogey.set_velocity(-50,0)
    bogey.left = scene.screen_width()
    bogey.y = randint(0,scene.screen_height())
    bogey.set_flag(SpriteFlag.AUTO_DESTROY, True)

game.on_update_interval(500,on_update_interval)

def on_on_overlap(sprite, otherSprite):
    otherSprite.destroy()
    info.change_life_by(-1)

def on_bullet_overlap(sprite,otherSprite):
    otherSprite.destroy()
    sprite.destroy(effects.fire,100)
    info.change_score_by(1)

sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_bullet_overlap)
