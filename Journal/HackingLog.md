Log something interesting I read everyday, possibly export to my personal website later
=======================================================================================

02/11/15
--------

###How FireBase push works?

<!--  comment out
####Words
  caveat: warning
-->

####Phrase:
  *base64: transfer binary data to textual data, binary-to-text encoding schemes, usually needed when need to transfer binay data over media which
    are designed to deal with textual data, such as eamil through MIME, storing complex data in XML.
  *MIME: multi-purpose Internet Mail Extention, an extention of original intert email protocol to let people transfer all sorts of data: audio, media, image...

####Creattion:
  The push id is aim to provide collabaritive work, different clients work at the same time
  There are 120 bits of id, first 48 bits are timestamp which reserve the id chronologically,
  remaining 72 bits of randomness to ensure unlikely create a id at the same millisecond, they
  are unlikely to be the same, for one user create multitple ids, simply increment randomness by 1

####Usage:
  To be used as a FireBase key, basically base64 encode it into ASCII chars.
  Used a modified base64 to ensure the result key still sorted lexicographically.

####Issue:
  client's local clock could be incorrect. ( uncontrollable issue )
  attempt: each time client establish a connection, server send a correct timestamp to client

####Security:
  let user implement if needed.

###Source:
  generate-pushid.js

###TODO:
  write a ruby versionof source code

04/02/15
--------

### I want to do a product, think about how to make a better product
