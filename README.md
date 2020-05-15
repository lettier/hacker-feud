![Hacker Feud](https://i.imgur.com/2Q0EAXK.gif)

# Hacker Feud

A tongue-in-cheek parody of Family Feud but for software engineers.
Made with [Svelte](https://github.com/sveltejs/svelte).
Click [here](https://lettier.github.io/hacker-feud/) to play.

# Gameplay

Among your group, select a host.
The host will read off the questions,
input the guesses, and manage the other parts of the interface.
The rest of the group has to split into two teams.
Within each team, order everyone sequentially.

At the start of a round,
the first person from each team faces off.
For the very first guess,
during the face off,
the first person to say their guess goes first.
Keep alternating until there is a correct guess.
Whoever gives a correct guess wins the face off
and their team now controls the board.
At this moment, the controlling team can
pass control to the opposing team if they wish.

With control of the board,
sequentially move through the team
with each member giving a guess.
After three strikes,
the opposing team has a chance to guess and steal the bank.
The bank is the number located in the middle near the top.
If the opposing team doesn't steal or rather, gives an incorrect guess,
the bank goes to the team that struck out.

# Customize

The team names, questions, answers, and points are located in [main.js](src/main.js).

# Build

```bash
git clone https://github.com/lettier/hacker-feud.git
cd hacker-feud
# Install Node Version Manager.
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm use
npm install
npm run build
```

# Run

```bash
npm run dev &> /dev/null &
python -mwebbrowser http://localhost:55555
```

## Copyright

(C) 2020 David Lettier
<br>
[lettier.com](https://www.lettier.com)
