This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This project is a single page web application to decode text that has been encoded in a very specific way. The app works on text that has first been encoded with a monoalphabetic cypher that uses a single word as a key and then with a polyalphabetic cypher that uses a single word as a key.

Cypher specifics: The encryption method first strips all non aphabetic characters and spaces out of the text. The first encryption takes a word as a key, say 'message'. The word is moddified as to remove all uses of a letter after the first. So now 'message' has become 'mesag'.  To obtain the monoalphabetic cypher first write out the keyword in a grid and then fill the unused letters of the alphabet bellow in a grid as shown.
| m  |  e | s  |  a |  g |
|---|---|---|---|---|
| b  | c  | d  | f  | h  |
| i  | j  | k  | l  | n  |
| o  | p  | q  | r  | t  |
| u  | v  | w  | x  | y  |
| z  |   |   |   |   |

Then write the alphabet collum wise next to the previously written characters like so.
| m *a* | e *g* | s *l* | a *q* | g *v* |
|---|---|---|---|---|
| b *b* | c *h* | d *m* | f *r* | h *w* |
| i *c* | j *i* | k *n* | l *s* | n *x* |
| o *d* | p *j* | q *o* | r *t* | t *y* |
| u *e* | v *k* | w *p* | x *u* | y *z* |
| z *f* |   |   |   |   |

The table above can be used to encrypt the text. The letters in italics are the encoded characters. Thus m -> a.

To do the second encoding is multiple ceaser cyphers. For the first letter in the text to be encoded look at the first letter in the keyword and move it down the alphabet the distance the first key letter was from 'a'. 

