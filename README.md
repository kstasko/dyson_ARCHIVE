# Dyson
Discord Bot intended to support the discord server
## Features
### Dyson can...
  - reply 'tight' with 'tight'

### Dyson would like to...
  - play chungus song
  - report people

#

![Image of AWS Architecture](https://github.com/kstasko/dyson/blob/master/images/dyson.jpg)

#

## MVP 1 - Tight:
- [x] ~~EC2 instance is currently listening to Discord Channel~~
- [x] ~~EC2 creates SNS topic~~
- [x] ~~SNS triggers lambda~~
- [ ] lambda function writes to discord
#

## MVP 2 - Tight IaC:
- [ ] EC2 runs with new folder structure
- [ ] IaC builds SNS topics
- [ ] IaC builds lambda shell with trigger
