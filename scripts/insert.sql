PREFIX ex: <http://example.com/>

INSERT { <ex:manufacturer/MERCEDES> ex:title "Mercedes" } WHERE {};
INSERT { <ex:manufacturer/FERRARI> ex:title "Ferrari" } WHERE {};
INSERT { <ex:manufacturer/REDBULLRACINGTAGHEUER> ex:title  "Red Bull Racing Tag Heuer" } WHERE {};

INSERT { <ex:driver/SebastianVettel> ex:title  "Sebastian Vettel" } WHERE {};
INSERT { <ex:driver/SebastianVettel> ex:drives  <ex:manufacturer/MERCEDES> } WHERE {};

INSERT { <ex:driver/LewisHamilton> ex:title  "Lewis Hamilton" } WHERE {};
INSERT { <ex:driver/LewisHamilton> ex:drives  <ex:manufacturer/FERRARI> } WHERE {};

INSERT { <ex:driver/ValtteriBottas> ex:title  "Valtteri Bottas" } WHERE {};
INSERT { <ex:driver/ValtteriBottas> ex:drives  <ex:manufacturer/MERCEDES> } WHERE {};

INSERT { <ex:driver/DanielRicciardo> ex:title  "Daniel Ricciardo" } WHERE {};
INSERT { <ex:driver/DanielRicciardo> ex:drives  <ex:manufacturer/REDBULLRACINGTAGHEUER> } WHERE {};

INSERT { <ex:driver/MaxVerstappen> ex:title  "Max Verstappen" } WHERE {};
INSERT { <ex:driver/MaxVerstappen> ex:drives  <ex:manufacturer/REDBULLRACINGTAGHEUER> } WHERE {};