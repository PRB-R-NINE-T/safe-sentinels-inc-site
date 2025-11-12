import pygame
import time

pygame.init()
pygame.joystick.init()

if pygame.joystick.get_count() == 0:
    print("No joystick detected!")
    exit()

joystick = pygame.joystick.Joystick(0)
joystick.init()

print(f"Joystick detected: {joystick.get_name()}")
print(f"Number of axes: {joystick.get_numaxes()}")
print(f"Number of buttons: {joystick.get_numbuttons()}")
print("\nReading joystick values... (Press Ctrl+C to stop)\n")

try:
    while True:
        pygame.event.pump()
        
        left_x = joystick.get_axis(0)
        left_y = joystick.get_axis(1)
        
        right_x = joystick.get_axis(2)
        right_y = joystick.get_axis(3)
        
        print(f"Left Controller: X={left_x:+.3f}, Y={left_y:+.3f} | Right Controller: X={right_x:+.3f}, Y={right_y:+.3f}")
        
        time.sleep(0.1)
        
except KeyboardInterrupt:
    print("\n\nStopping...")
    pygame.quit()

