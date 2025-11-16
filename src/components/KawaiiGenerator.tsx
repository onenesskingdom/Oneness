'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Download, Shuffle, RefreshCcw } from 'lucide-react';

interface KawaiiAvatar {
  skinColor: string;
  eyeColor: string;
  hairColor: string;
  hairStyle: string;
  expression: string;
  clothing: string;
  accessory: string;
}

interface KawaiiGeneratorProps {
  onAvatarGenerated?: (avatarData: KawaiiAvatar, imageUrl: string) => void;
  onSave?: (avatarData: { avatar: KawaiiAvatar; imageUrl: string }) => void;
  isSaving?: boolean;
}

const skinColors = ['#FDBCB4', '#F1C27D', '#E0AC69', '#C68642', '#8D5524'];
const eyeColors = ['#4A90E2', '#50E3C2', '#B8E986', '#F5A623', '#D0021B', '#9013FE'];
const hairColors = ['#2D3748', '#4A5568', '#718096', '#A0AEC0', '#E2E8F0', '#FED7D7'];
const hairStyles = ['short', 'long', 'curly', 'ponytail', 'bun'];
const expressions = ['happy', 'excited', 'calm', 'curious', 'sleepy'];
const clothing = ['casual', 'formal', 'sporty', 'elegant', 'cute'];
const accessories = ['none', 'glasses', 'hat', 'bow', 'earrings'];

const KawaiiGenerator: React.FC<KawaiiGeneratorProps> = ({ onAvatarGenerated, onSave, isSaving = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [avatar, setAvatar] = useState<KawaiiAvatar>({
    skinColor: skinColors[0],
    eyeColor: eyeColors[0],
    hairColor: hairColors[0],
    hairStyle: hairStyles[0],
    expression: expressions[0],
    clothing: clothing[0],
    accessory: accessories[0]
  });

  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const randomizeAvatar = useCallback(() => {
    const newAvatar: KawaiiAvatar = {
      skinColor: skinColors[Math.floor(Math.random() * skinColors.length)],
      eyeColor: eyeColors[Math.floor(Math.random() * eyeColors.length)],
      hairColor: hairColors[Math.floor(Math.random() * hairColors.length)],
      hairStyle: hairStyles[Math.floor(Math.random() * hairStyles.length)],
      expression: expressions[Math.floor(Math.random() * expressions.length)],
      clothing: clothing[Math.floor(Math.random() * clothing.length)],
      accessory: accessories[Math.floor(Math.random() * accessories.length)]
    };
    setAvatar(newAvatar);
    generateAvatar(newAvatar);
  }, []);

  const generateAvatar = useCallback((avatarData: KawaiiAvatar) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw avatar
    drawKawaiiAvatar(ctx, avatarData, canvas.width, canvas.height);

    // Convert to image URL
    const imageUrl = canvas.toDataURL('image/png');
    setGeneratedImageUrl(imageUrl);
  }, [avatar]);

  const drawKawaiiAvatar = (ctx: CanvasRenderingContext2D, avatar: KawaiiAvatar, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw head (circle)
    ctx.beginPath();
    ctx.arc(centerX, centerY - 20, 80, 0, 2 * Math.PI);
    ctx.fillStyle = avatar.skinColor;
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw hair based on style
    drawHair(ctx, avatar, centerX, centerY);

    // Draw eyes
    drawEyes(ctx, avatar, centerX, centerY);

    // Draw mouth based on expression
    drawMouth(ctx, avatar, centerX, centerY);

    // Draw clothing
    drawClothing(ctx, avatar, centerX, centerY);

    // Draw accessory
    if (avatar.accessory !== 'none') {
      drawAccessory(ctx, avatar, centerX, centerY);
    }

    // Generate data URL from canvas
    setGeneratedImageUrl(canvas.toDataURL('image/png'));
  };

  const drawHair = (ctx: CanvasRenderingContext2D, avatar: KawaiiAvatar, centerX: number, centerY: number) => {
    ctx.fillStyle = avatar.hairColor;
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;

    switch (avatar.hairStyle) {
      case 'short':
        // Short hair
        ctx.beginPath();
        ctx.arc(centerX, centerY - 70, 30, 0, Math.PI);
        ctx.fill();
        ctx.stroke();
        break;
      case 'long':
        // Long hair
        ctx.beginPath();
        ctx.arc(centerX, centerY - 60, 40, 0, Math.PI);
        ctx.fill();
        ctx.stroke();
        // Add strands
        for (let i = -20; i <= 20; i += 10) {
          ctx.beginPath();
          ctx.moveTo(centerX + i, centerY - 20);
          ctx.lineTo(centerX + i + Math.random() * 5 - 2.5, centerY + 40);
          ctx.stroke();
        }
        break;
      case 'curly':
        // Curly hair
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI;
          const x = centerX + Math.cos(angle) * 35;
          const y = centerY - 50 + Math.sin(angle) * 35;
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, 2 * Math.PI);
          ctx.fill();
        }
        break;
      case 'ponytail':
        // Ponytail
        ctx.beginPath();
        ctx.arc(centerX, centerY - 70, 25, 0, Math.PI);
        ctx.fill();
        // Ponytail strand
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 45);
        ctx.lineTo(centerX, centerY + 50);
        ctx.lineWidth = 8;
        ctx.strokeStyle = avatar.hairColor;
        ctx.stroke();
        break;
      case 'bun':
        // Bun
        ctx.beginPath();
        ctx.arc(centerX, centerY - 70, 25, 0, Math.PI);
        ctx.fill();
        // Bun
        ctx.beginPath();
        ctx.arc(centerX, centerY - 80, 15, 0, 2 * Math.PI);
        ctx.fill();
        break;
    }
  };

  const drawEyes = (ctx: CanvasRenderingContext2D, avatar: KawaiiAvatar, centerX: number, centerY: number) => {
    const eyeY = centerY - 10;
    const eyeDistance = 25;

    // Left eye
    ctx.beginPath();
    ctx.ellipse(centerX - eyeDistance, eyeY, 12, 15, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.stroke();

    // Right eye
    ctx.beginPath();
    ctx.ellipse(centerX + eyeDistance, eyeY, 12, 15, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();

    // Pupils
    ctx.beginPath();
    ctx.arc(centerX - eyeDistance, eyeY, 6, 0, 2 * Math.PI);
    ctx.fillStyle = avatar.eyeColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX + eyeDistance, eyeY, 6, 0, 2 * Math.PI);
    ctx.fillStyle = avatar.eyeColor;
    ctx.fill();

    // Sparkles in eyes
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(centerX - eyeDistance - 2, eyeY - 2, 1.5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + eyeDistance + 2, eyeY - 2, 1.5, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawMouth = (ctx: CanvasRenderingContext2D, avatar: KawaiiAvatar, centerX: number, centerY: number) => {
    const mouthY = centerY + 20;

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;

    switch (avatar.expression) {
      case 'happy':
        ctx.beginPath();
        ctx.arc(centerX, mouthY, 8, 0, Math.PI);
        ctx.stroke();
        break;
      case 'excited':
        ctx.beginPath();
        ctx.arc(centerX, mouthY - 5, 12, 0, Math.PI);
        ctx.stroke();
        // Add exclamation
        ctx.fillStyle = '#FF6B6B';
        ctx.beginPath();
        ctx.arc(centerX + 30, mouthY - 20, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillRect(centerX + 29, mouthY - 10, 2, 8);
        break;
      case 'calm':
        ctx.beginPath();
        ctx.moveTo(centerX - 6, mouthY);
        ctx.lineTo(centerX + 6, mouthY);
        ctx.stroke();
        break;
      case 'curious':
        ctx.beginPath();
        ctx.arc(centerX, mouthY, 4, 0, Math.PI, true);
        ctx.stroke();
        break;
      case 'sleepy':
        ctx.beginPath();
        ctx.ellipse(centerX, mouthY + 2, 6, 2, 0, 0, Math.PI);
        ctx.stroke();
        // Zzz
        ctx.fillStyle = '#87CEEB';
        ctx.font = '12px Arial';
        ctx.fillText('z', centerX + 35, mouthY - 10);
        ctx.fillText('z', centerX + 45, mouthY - 15);
        ctx.fillText('z', centerX + 55, mouthY - 20);
        break;
    }
  };

  const drawClothing = (ctx: CanvasRenderingContext2D, avatar: KawaiiAvatar, centerX: number, centerY: number) => {
    const clothingY = centerY + 60;

    switch (avatar.clothing) {
      case 'casual':
        // T-shirt
        ctx.fillStyle = '#FF6B9D';
        ctx.fillRect(centerX - 40, clothingY, 80, 60);
        ctx.strokeStyle = '#333';
        ctx.strokeRect(centerX - 40, clothingY, 80, 60);
        break;
      case 'formal':
        // Suit
        ctx.fillStyle = '#4A90E2';
        ctx.fillRect(centerX - 35, clothingY, 70, 50);
        ctx.strokeStyle = '#333';
        ctx.strokeRect(centerX - 35, clothingY, 70, 50);
        // Tie
        ctx.fillStyle = '#D0021B';
        ctx.fillRect(centerX - 3, clothingY + 10, 6, 20);
        break;
      case 'sporty':
        // Sports jersey
        ctx.fillStyle = '#50E3C2';
        ctx.fillRect(centerX - 38, clothingY, 76, 55);
        ctx.strokeStyle = '#333';
        ctx.strokeRect(centerX - 38, clothingY, 76, 55);
        // Number
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText('7', centerX - 5, clothingY + 30);
        break;
      case 'elegant':
        // Dress
        ctx.fillStyle = '#B8E986';
        ctx.beginPath();
        ctx.moveTo(centerX, clothingY);
        ctx.lineTo(centerX - 30, clothingY + 40);
        ctx.lineTo(centerX + 30, clothingY + 40);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      case 'cute':
        // Cute dress with polka dots
        ctx.fillStyle = '#F5A623';
        ctx.fillRect(centerX - 35, clothingY, 70, 50);
        ctx.strokeStyle = '#333';
        ctx.strokeRect(centerX - 35, clothingY, 70, 50);
        // Polka dots
        ctx.fillStyle = '#333';
        for (let i = 0; i < 6; i++) {
          const x = centerX - 25 + (i % 3) * 15;
          const y = clothingY + 10 + Math.floor(i / 3) * 15;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, 2 * Math.PI);
          ctx.fill();
        }
        break;
    }
  };

  const drawAccessory = (ctx: CanvasRenderingContext2D, avatar: KawaiiAvatar, centerX: number, centerY: number) => {
    switch (avatar.accessory) {
      case 'glasses':
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 3;
        // Left lens
        ctx.beginPath();
        ctx.ellipse(centerX - 25, centerY - 10, 15, 12, 0, 0, 2 * Math.PI);
        ctx.stroke();
        // Right lens
        ctx.beginPath();
        ctx.ellipse(centerX + 25, centerY - 10, 15, 12, 0, 0, 2 * Math.PI);
        ctx.stroke();
        // Bridge
        ctx.beginPath();
        ctx.moveTo(centerX - 10, centerY - 10);
        ctx.lineTo(centerX + 10, centerY - 10);
        ctx.stroke();
        break;
      case 'hat':
        ctx.fillStyle = '#D0021B';
        ctx.beginPath();
        ctx.arc(centerX, centerY - 85, 35, Math.PI, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.stroke();
        break;
      case 'bow':
        ctx.fillStyle = '#FF6B9D';
        ctx.beginPath();
        ctx.moveTo(centerX - 15, centerY - 70);
        ctx.lineTo(centerX - 5, centerY - 80);
        ctx.lineTo(centerX + 5, centerY - 70);
        ctx.lineTo(centerX + 15, centerY - 80);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.stroke();
        break;
      case 'earrings':
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(centerX - 45, centerY - 5, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX + 45, centerY - 5, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        break;
    }
  };

  const downloadAvatar = useCallback(() => {
    if (generatedImageUrl) {
      const link = document.createElement('a');
      link.href = generatedImageUrl;
      link.download = 'kawaii-avatar.png';
      link.click();
    }
  }, [generatedImageUrl]);

  const saveAvatar = useCallback(() => {
    if (generatedImageUrl && onSave) {
      onSave({
        avatar,
        imageUrl: generatedImageUrl
      });
    }
  }, [avatar, generatedImageUrl, onSave]);

  React.useEffect(() => {
    generateAvatar(avatar);
  }, [avatar, generateAvatar]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-kawaii">
          ✨ Create Your Kawaii Avatar ✨
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Avatar Preview */}
          <div className="flex flex-col items-center space-y-4">
            <div className="border-4 border-pink-200 rounded-lg p-4 bg-gradient-to-br from-pink-50 to-purple-50">
              <canvas
                ref={canvasRef}
                width={300}
                height={300}
                className="border border-gray-300 rounded-lg shadow-lg"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={randomizeAvatar} variant="outline" size="sm">
                <Shuffle className="w-4 h-4 mr-2" />
                Randomize
              </Button>
              {onSave && generatedImageUrl && (
                <Button onClick={saveAvatar} disabled={isSaving} variant="default" size="sm">
                  {isSaving ? '保存中...' : '保存する'}
                </Button>
              )}
              {generatedImageUrl && (
                <Button onClick={downloadAvatar} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              )}
            </div>
          </div>

          {/* Customization Controls */}
          <div className="space-y-4">
            {/* Skin Color */}
            <div>
              <Label className="text-sm font-medium">Skin Color</Label>
              <div className="flex gap-2 mt-2">
                {skinColors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${
                      avatar.skinColor === color ? 'border-pink-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setAvatar(prev => ({ ...prev, skinColor: color }))}
                  />
                ))}
              </div>
            </div>

            {/* Eye Color */}
            <div>
              <Label className="text-sm font-medium">Eye Color</Label>
              <div className="flex gap-2 mt-2">
                {eyeColors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${
                      avatar.eyeColor === color ? 'border-pink-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setAvatar(prev => ({ ...prev, eyeColor: color }))}
                  />
                ))}
              </div>
            </div>

            {/* Hair Color */}
            <div>
              <Label className="text-sm font-medium">Hair Color</Label>
              <div className="flex gap-2 mt-2">
                {hairColors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${
                      avatar.hairColor === color ? 'border-pink-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setAvatar(prev => ({ ...prev, hairColor: color }))}
                  />
                ))}
              </div>
            </div>

            {/* Hair Style */}
            <div>
              <Label className="text-sm font-medium">Hair Style</Label>
              <Select value={avatar.hairStyle} onValueChange={(value) => setAvatar(prev => ({ ...prev, hairStyle: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {hairStyles.map((style) => (
                    <SelectItem key={style} value={style}>
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Expression */}
            <div>
              <Label className="text-sm font-medium">Expression</Label>
              <Select value={avatar.expression} onValueChange={(value) => setAvatar(prev => ({ ...prev, expression: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {expressions.map((expression) => (
                    <SelectItem key={expression} value={expression}>
                      {expression.charAt(0).toUpperCase() + expression.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clothing */}
            <div>
              <Label className="text-sm font-medium">Clothing</Label>
              <Select value={avatar.clothing} onValueChange={(value) => setAvatar(prev => ({ ...prev, clothing: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {clothing.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Accessory */}
            <div>
              <Label className="text-sm font-medium">Accessory</Label>
              <Select value={avatar.accessory} onValueChange={(value) => setAvatar(prev => ({ ...prev, accessory: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {accessories.map((accessory) => (
                    <SelectItem key={accessory} value={accessory}>
                      {accessory.charAt(0).toUpperCase() + accessory.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KawaiiGenerator;
